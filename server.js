const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();
const PORT = process.env.PORT || 3001;
const sess = {
	secret: 'Super cool secret',
	cookie: {maxAge: 30 * 60 * 1000},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize
	})
};

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}.`));  // formatted to make link clickable in VS Code console
});