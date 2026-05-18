const fs = require("fs");
const path = require("path");
const { projectFiles } = require("archunit");

const SRC_DIR = path.join(__dirname, "..", "src");

function listFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(fullPath) : [fullPath];
  });
}

function normalize(filePath) {
  return filePath.replace(/\\/g, "/");
}

function sourceFiles() {
  return listFiles(SRC_DIR)
    .filter((filePath) => filePath.endsWith(".js"))
    .map((filePath) => ({
      path: normalize(path.relative(path.join(__dirname, ".."), filePath)),
      content: fs.readFileSync(filePath, "utf8")
    }));
}

function expectNoForbiddenDependency(files, layerPattern, forbiddenPatterns) {
  const violations = files
    .filter((file) => layerPattern.test(file.path))
    .flatMap((file) =>
      forbiddenPatterns
        .filter((pattern) => pattern.test(file.content))
        .map((pattern) => `${file.path} references ${pattern}`)
    );

  expect(violations).toEqual([]);
}

describe("BFF architecture", () => {
  const files = sourceFiles();

  it("loads ArchUnitTS and targets source files", () => {
    expect(typeof projectFiles).toBe("function");
    expect(files.length).toBeGreaterThan(0);
  });

  it("keeps application layer independent from Express and Axios", () => {
    expectNoForbiddenDependency(files, /features\/.+\/application\//, [
      /require\(["']express["']\)/,
      /require\(["']axios["']\)/
    ]);
  });

  it("keeps presentation layer away from direct Axios usage", () => {
    expectNoForbiddenDependency(files, /features\/.+\/presentation\//, [
      /require\(["']axios["']\)/
    ]);
  });

  it("keeps Axios usage inside infrastructure", () => {
    const violations = files
      .filter((file) => /require\(["']axios["']\)/.test(file.content))
      .filter((file) => !file.path.includes("/infrastructure/"))
      .map((file) => file.path);

    expect(violations).toEqual([]);
  });
});
