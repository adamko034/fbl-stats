import { SmartTeamsSelectionBy } from 'src/app/layout/content/components/players-filters/components/players-filter-teams/model/smart-selects/smart-teams-selecetion-by.enum';

export interface SmartTeamsSelectionDialogResult {
  selection: SmartTeamsSelectionBy;
  count: number;
}
