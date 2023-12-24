import { Runtime } from "webextension-polyfill";
import { handleInstalled } from "./handleInstalled";

jest.mock("webextension-polyfill", () => ({
  __esModule: true,
  default: {
    runtime: {
      getManifest: () => ({
        version: "1.2.3",
      }),
    },
  },
}));

describe("handleInstalled", () => {
  it("should log the current version when the extension is installed", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    handleInstalled({ reason: "install" } as Runtime.OnInstalledDetailsType);

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("1.2.3"));
  });
});
