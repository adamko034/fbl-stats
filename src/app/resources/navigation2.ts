import { NavigationLink } from 'src/app/shared/models/navigation-link.model';

export class Navigation2 {
  public static Links: NavigationLink[] = [
    {
      order: 1,
      text: 'Home',
      path: 'home',
      icon: 'home'
    },
    {
      order: 2,
      text: 'Players',
      icon: 'person_search',
      children: [
        { order: 1, path: 'fantasy/players', text: 'All players' },
        { order: 2, path: 'fantasy/players/lists/onsale', text: 'On sale' },
        { order: 3, path: 'fantasy/players/lists/unavailable', text: 'Unavailable' },
        { order: 4, path: 'fantasy/players/lists/suspensionrisk', text: 'Suspension risk' },
        { order: 5, path: 'fantasy/players/lists/returning', text: 'Returning' },
        { order: 6, path: 'fantasy/compare', text: 'Compare' }
      ]
    },
    {
      order: 3,
      text: 'My team',
      path: 'fantasy/myteam',
      icon: 'groups'
    },
    {
      order: 4,
      text: 'Stats',
      icon: 'insights',
      children: [
        { order: 1, path: 'fantasy/stats/points', text: 'Players stats' },
        { order: 2, path: 'fantasy/stats/gamesplayed', text: 'Games played' },
        { order: 3, path: 'fantasy/stats/pointsefficiency/overall', text: 'Points efficiency' },
        { order: 4, path: 'fantasy/stats/avgpoints', text: 'Avg points' }
      ]
    },
    {
      order: 5,
      text: 'Leaders',
      icon: 'leaderboard',
      children: [
        { order: 1, path: 'fantasy/leaders/top500', text: 'Top 500' },
        { order: 2, path: 'fantasy/leaders/top100', text: 'Top 100' }
      ]
    },
    {
      order: 6,
      text: 'Predicted lineups',
      icon: 'reduce_capacity',
      children: [
        { order: 1, path: 'teams/lineups/next/summary', text: 'Predictions' },
        { order: 2, path: 'teams/lineups/sources', text: 'Sources compare' }
      ]
    },
    {
      order: 7,
      text: 'Tips & links',
      icon: 'batch_prediction',
      children: [
        { order: 1, path: 'fantasy/tips/ourpicks', text: 'Our picks' },
        { order: 2, path: 'fantasy/tips/bestteam', text: 'Best team' },
        { order: 3, path: 'fantasy/tips/links', text: 'Useful links' },
        { order: 4, path: 'fantasy/tips/unlimitedtransfers', text: 'Unlimited transfers' }
      ]
    },
    {
      order: 8,
      text: 'Fixures analysis',
      icon: 'dynamic_form',
      children: [
        { order: 1, path: 'teams/fixturesanalysis/difficulty', text: 'Fixtures difficulty' },
        { order: 2, path: 'teams/fixturesanalysis/kickofftimes', text: 'Kickoff times' },
        { order: 3, path: 'teams/fixturesanalysis/firstgames', text: 'Matchdays first games' }
      ]
    },
    {
      order: 9,
      text: 'Bundesliga',
      icon: 'emoji_events',
      children: [
        { order: 1, path: 'teams/bundesliga/table', text: 'Bundesliga table' },
        { order: 2, path: 'teams/bundesliga/fixtures', text: 'Fixtures' }
      ]
    },
    {
      order: 10,
      text: 'History',
      icon: 'history',
      children: [
        { order: 1, path: 'fantasy/history/2021-2022', text: 'Team of the season' },
        { order: 2, path: 'fantasy/history/2021-2022/players', text: 'Players results' },
        { order: 3, path: 'fantasy/history/2021-2022/bundesliga', text: 'Bundesliga table' }
      ]
    }
    // {
    //   order: 1,
    //   text: 'Fantasy',
    //   children: [
    //     {
    //       order: 0,
    //       text: 'Home',
    //       path: 'home',
    //       icon: 'home'
    //     },
    //     {
    //       order: 1,
    //       text: 'Players',
    //       path: 'fantasy/players',
    //       icon: 'person_search'
    //     },
    //     {
    //       order: 2,
    //       path: 'fantasy/myteam',
    //       text: 'My team',
    //       icon: 'groups'
    //     },
    //     { order: 3, path: 'fantasy/stats', text: 'Stats', icon: 'insights' },
    //     { order: 4, path: 'fantasy/leaders', text: 'Leaders', icon: 'leaderboard' },
    //     { order: 6, path: 'fantasy/tips', text: 'Matchday tips', icon: 'batch_prediction' },
    //     { order: 7, path: 'fantasy/compare', text: 'Compare', icon: 'compare' }
    //   ]
    // },
    // {
    //   order: 2,
    //   text: 'Teams',
    //   children: [
    //     { order: 1, text: 'Predicted lineups', path: 'teams/lineups', icon: 'reduce_capacity' },
    //     { order: 2, path: 'teams/bundesliga', text: 'Bundesliga', icon: 'emoji_events' },
    //     { order: 4, path: 'teams/fixturesanalysis', text: 'Fixtures analysis', icon: 'dynamic_form' }
    //   ]
    // },
    // {
    //   order: 3,
    //   text: 'History',
    //   children: [
    //     { order: 1, path: 'fantasy/history/2021-2022', text: '2021-2022', icon: 'keyboard_arrow_left' },
    //     { order: 1, path: 'fantasy/history/2020-2021', text: '2020-2021', icon: 'keyboard_double_arrow_left' }
    //   ]
    // },
    // {
    //   order: 4,
    //   text: 'Other',
    //   children: [{ order: 2, path: 'fantasy/usefullinks', text: 'Useful links', icon: 'link' }]
    // }
  ];
}
