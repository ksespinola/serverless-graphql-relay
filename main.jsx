const { IndexRoute, Route } = ReactRouter;

function onEnterSignUp(state, newState){
  if(!Meteor.user()) return true;
  newState(null, '/account');
}

AppRoutes = (
  <Route path="/" component={App.Handler}>
    <IndexRoute component={Home.Handler}/>
    <Route path='blog' component={Post.Handlers.Index}>
      <IndexRoute component={Post.Handlers.List}/>
      <Route path='/post/:id' component={Post.Handlers.Show}/>
    </Route>
    <Route component={User.Handlers.Index}>
      <Route path='account' component={User.Handlers.Edit}/>
      <Route path='sign-up' onEnter={onEnterSignUp} component={User.Handlers.New}/>
      <Route path='login' component={User.Handlers.Session}/>
      <Route path='users' component={User.Handlers.List}/>
    </Route>
    <Route path='roles' component={Role.Handlers.List}/>
    <Route path='configure' component={Site.Handlers.Settings} />
    <Route component={Site.Handlers.Index}>
      <Route path='sites' component={Site.Handlers.List}/>
    </Route>
  </Route>
);

ReactRouterSSR.Run(AppRoutes);
