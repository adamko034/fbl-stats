import { SmartTeamsSelectionBy } from 'src/app/modules/players/views/players-fantasy/components/players-filters/components/players-filter-teams/model/smart-selects/smart-teams-selecetion-by.enum';

export interface SmartTeamsSelectionDialogResult {
  selection: SmartTeamsSelectionBy;
  count: number;
}
