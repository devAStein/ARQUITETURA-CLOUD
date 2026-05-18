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

describe("Products service architecture", () => {
  const files = sourceFiles();

  it("loads ArchUnitTS and targets source files", () => {
    expect(typeof projectFiles).toBe("function");
    expect(files.length).toBeGreaterThan(0);
  });

  it("keeps domain and application independent from Express and Mongoose", () => {
    expectNoForbiddenDependency(files, /features\/products\/(domain|application)\//, [
      /require\(["']express["']\)/,
      /require\(["']mongoose["']\)/,
      /swagger-ui-express/,
      /swagger-jsdoc/
    ]);
  });

  it("keeps presentation away from direct database access", () => {
    expectNoForbiddenDependency(files, /features\/products\/presentation\//, [
      /require\(["']mongoose["']\)/,
      /Product\./
    ]);
  });

  it("keeps Mongoose usage inside infrastructure or config", () => {
    const violations = files
      .filter((file) => /require\(["']mongoose["']\)/.test(file.content))
      .filter((file) => !file.path.includes("/infrastructure/") && !file.path.includes("/config/"))
      .map((file) => file.path);

    expect(violations).toEqual([]);
  });
});
