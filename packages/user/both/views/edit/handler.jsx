const {
  Card,
  CardHeader,
  TextField,
  Avatar,
  RaisedButton,
} = MUI;

const {
  Form,
  Field,
} = AutoForm;

const {
  reduce,
  values,
} = R;

const ProfileSchema = new SimpleSchema({
  'first_name': {
    type: String,
    optional: true,
    label: 'First Name',
    defaultValue: ''
  },
  'last_name': {
    type: String,
    optional: true,
    label: 'Last Name',
    defaultValue: ''
  },
});

User.Handlers.Edit = React.createClass({
  
  getInitialState(){
    const {
      user: {
        profile = {}
      } = {},  
    } = this.props;
    return {
      profile,
    }  
  },
  
  componentWillReceiveProps({user = {}}) {

    const { profile } = user;
    
    profile && this.setState({profile});
  },
  
  render() {
    const {
      profile: {
        full_name = '',        
      } = {},
    } = this.state;

    return (
      <Card>
        <CardHeader
          title={full_name}
          avatar={<Avatar>{full_name.charAt(0).toUpperCase()}</Avatar>}
          />
        <Form 
          value={this.state.profile} 
          onChange={profile => this.setState({ profile })} 
          schema={ProfileSchema} 
          onSubmit={this._handleSubmit}>
          <Field name='first_name' component={TextField} floatingLabelText='First Name' fullWidth />
          <Field name='last_name' component={TextField} floatingLabelText='Last Name' fullWidth />
          <TextField fullWidth type='submit' />
        </Form>
      </Card>
    )
  },
  
  _handleSubmit(profile){
    const keys = Object.keys(profile);
    const profileValues = values(profile);
    let i = 0;
    
    const update = reduce((memo, value) => {
      memo[`profile.${keys[i]}`] = value;
      i++;
      return memo;
    },{}, profileValues);
    
    Meteor.users.update(Meteor.userId(), { $set: { ... update} })
  }
  
});
