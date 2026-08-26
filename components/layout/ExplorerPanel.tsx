import { FileTree } from "./FileTree";
import { SidePanelShell } from "./SidePanelShell";

export function ExplorerPanel() {
  return (
    <SidePanelShell
      title="EXPLORER"
      footer="Click a file to open it — same filesystem as the terminal below."
    >
      <FileTree />
    </SidePanelShell>
  );
}
