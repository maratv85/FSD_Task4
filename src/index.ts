import './demo-page/style/common.scss';

function importAll(resolve: any) {
  resolve.keys().forEach(resolve);
}

importAll(require.context('./', true, /\.(css|scss)$/));
importAll(require.context('./demo-page/static/favicon/', true, /\.(svg|png|ico|xml|json)$/),);
importAll(require.context('./demo-page/static/fonts/', true, /\.(eot|svg|ttf|woff|woff2)$/),);
