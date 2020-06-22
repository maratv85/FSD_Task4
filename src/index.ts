//import './page/index';

function importAll(resolve: any) {
  resolve.keys().forEach(resolve);
}
importAll(require.context('./style', true, /\.(css|scss)$/));
importAll(require.context('./static/favicon/', true, /\.(svg|png|ico|xml|json)$/),);
importAll(require.context('./', true, /^(?!.*(?:spec.ts$)).*\.ts|.scss$/));