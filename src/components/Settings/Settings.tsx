import { useCallback, useRef, useState } from "react";

import { storeActions, useProgress } from "../../store/main";

import * as Styled from "./styled";

const Settings = () => {
  const state = useProgress();
  const [exportData, setExportData] = useState("");
  const [showImport, setShowImport] = useState(false);
  const [importStatus, setImportStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const importRef = useRef<HTMLTextAreaElement>(null);

  const handleToggle = useCallback(
    (key: "floatingNumbers" | "particleEffects" | "autoSave") => {
      storeActions.updateSetting(key, !state.settings[key]);
    },
    [state.settings]
  );

  const handleNotationChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      storeActions.updateSetting(
        "notation",
        e.target.value as "suffix" | "scientific"
      );
    },
    []
  );

  const handleSave = useCallback(() => {
    storeActions.saveProgress();
  }, []);

  const handleExport = useCallback(() => {
    const data = storeActions.exportSave();
    setExportData(data);
    navigator.clipboard?.writeText(data).catch(() => {
      // Clipboard write may fail in some contexts; textarea is shown as fallback.
    });
  }, []);

  const handleImportToggle = useCallback(() => {
    setShowImport((prev) => !prev);
    setImportStatus("idle");
  }, []);

  const handleImportSubmit = useCallback(() => {
    const data = importRef.current?.value.trim();
    if (!data) return;
    const success = storeActions.importSave(data);
    setImportStatus(success ? "success" : "error");
    if (success) {
      setShowImport(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    const confirmed = window.confirm(
      "Are you sure you want to reset ALL game progress? This cannot be undone."
    );
    if (confirmed) {
      storeActions.resetGame();
    }
  }, []);

  return (
    <Styled.SettingsContainer>
      <Styled.Section>
        <Styled.SectionTitle>Preferences</Styled.SectionTitle>

        <Styled.SettingRow>
          <div>
            <Styled.SettingLabel>Floating Numbers</Styled.SettingLabel>
            <Styled.SettingDesc>
              Show damage numbers when clicking
            </Styled.SettingDesc>
          </div>
          <Styled.Toggle>
            <input
              type="checkbox"
              checked={state.settings.floatingNumbers}
              onChange={() => handleToggle("floatingNumbers")}
            />
            <Styled.ToggleSlider />
          </Styled.Toggle>
        </Styled.SettingRow>

        <Styled.SettingRow>
          <div>
            <Styled.SettingLabel>Particle Effects</Styled.SettingLabel>
            <Styled.SettingDesc>
              Show particle animations on click
            </Styled.SettingDesc>
          </div>
          <Styled.Toggle>
            <input
              type="checkbox"
              checked={state.settings.particleEffects}
              onChange={() => handleToggle("particleEffects")}
            />
            <Styled.ToggleSlider />
          </Styled.Toggle>
        </Styled.SettingRow>

        <Styled.SettingRow>
          <div>
            <Styled.SettingLabel>Auto-Save</Styled.SettingLabel>
            <Styled.SettingDesc>
              Automatically save progress periodically
            </Styled.SettingDesc>
          </div>
          <Styled.Toggle>
            <input
              type="checkbox"
              checked={state.settings.autoSave}
              onChange={() => handleToggle("autoSave")}
            />
            <Styled.ToggleSlider />
          </Styled.Toggle>
        </Styled.SettingRow>

        <Styled.SettingRow>
          <div>
            <Styled.SettingLabel>Number Notation</Styled.SettingLabel>
            <Styled.SettingDesc>
              How large numbers are displayed
            </Styled.SettingDesc>
          </div>
          <select
            value={state.settings.notation}
            onChange={handleNotationChange}
            style={{
              background: "#12122a",
              color: "#e0e0ff",
              border: "1px solid #2a2a4e",
              borderRadius: "6px",
              padding: "4px 8px",
              fontSize: "0.85rem",
              cursor: "pointer",
            }}
          >
            <option value="suffix">Suffix (K, M, B...)</option>
            <option value="scientific">Scientific (1.23e6)</option>
          </select>
        </Styled.SettingRow>
      </Styled.Section>

      <Styled.Section>
        <Styled.SectionTitle>Save Data</Styled.SectionTitle>
        <Styled.ButtonGroup>
          <Styled.ActionButton onClick={handleSave}>
            Save Now
          </Styled.ActionButton>
          <Styled.ActionButton onClick={handleExport}>
            Export Save
          </Styled.ActionButton>
          <Styled.ActionButton onClick={handleImportToggle}>
            {showImport ? "Cancel Import" : "Import Save"}
          </Styled.ActionButton>
        </Styled.ButtonGroup>

        {exportData && (
          <Styled.TextArea
            readOnly
            value={exportData}
            onClick={(e) => (e.target as HTMLTextAreaElement).select()}
          />
        )}

        {showImport && (
          <>
            <Styled.TextArea
              ref={importRef}
              placeholder="Paste your save data here..."
            />
            <Styled.ButtonGroup>
              <Styled.ActionButton onClick={handleImportSubmit}>
                Load Save
              </Styled.ActionButton>
            </Styled.ButtonGroup>
            {importStatus === "error" && (
              <p
                style={{
                  color: "#ff4444",
                  fontSize: "0.8rem",
                  margin: "8px 0 0",
                }}
              >
                Invalid save data. Please check and try again.
              </p>
            )}
          </>
        )}
      </Styled.Section>

      <Styled.Section>
        <Styled.SectionTitle>Danger Zone</Styled.SectionTitle>
        <Styled.DangerButton onClick={handleReset}>
          Reset Game
        </Styled.DangerButton>
      </Styled.Section>
    </Styled.SettingsContainer>
  );
};

export default Settings;
