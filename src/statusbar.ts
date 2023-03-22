import {
  StatusBarAlignment,
  window,
  TextDocument,
  StatusBarItem,
} from "vscode";
import { IReadingTimeData } from "./models";
import { matchesFileType } from "./file-type";

let _statusBarItem: StatusBarItem;

export function getStatusBarItem() {
  if (!_statusBarItem) {
    const priority = 2; // High priority since this is important in a markdown file
    _statusBarItem = window.createStatusBarItem(
      StatusBarAlignment.Right,
      priority
    );
  }
  return _statusBarItem;
}

export function clearStatusBar() {
  const statusBarItem = getStatusBarItem();

  statusBarItem.text = "";
  statusBarItem.tooltip = "";
  statusBarItem.hide();
}

export function updateStatusBar(
  document: TextDocument,
  readingTimeData: IReadingTimeData
) {
  const statusBarItem = getStatusBarItem();
  if (matchesFileType(document.languageId)) {
    const { minutes, seconds } = readingTimeData;
    statusBarItem.text = `$(book) ${minutes}m ${seconds}s`;
    statusBarItem.tooltip = `${minutes}m ${seconds}s read`;
    statusBarItem.show();
  } else {
    clearStatusBar();
  }
}
