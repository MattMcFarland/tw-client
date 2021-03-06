import React from 'react';
import remove from 'lodash.remove';
import AccountActions from '../../actions/AccountActions';
import AccountStore from '../../stores/AccountStore';
import ProfileActions from '../../actions/ProfileActions';
import ProfileStore from '../../stores/ProfileStore';



const constrainProportions = (from, to) => {
  let minRatio = Math.min(to.height / from.height, to.width / from.width);
  return {
    width: from.width  > to.width ? from.width  * minRatio : from.width,
    height: from.height > to.height ? from.height * minRatio : from.height
  }
}
const centerRect = (rect, container) => {
  return {
    x:  (container.width * 0.5)  - (rect.width  * 0.5),
    y: (container.height * 0.5)  - (rect.height * 0.5)
  }
}

const renderImage = (ctx, img, position, boundRect) => {
  ctx.drawImage(img, position.x, position.y, boundRect.width, boundRect.height);
  ctx.restore();
}

const renderCentered = (ctx, image, imgRect, boundRect) => {

  let
    scaledRect = constrainProportions(imgRect, boundRect),
    position = centerRect(scaledRect, boundRect);

  renderImage(ctx, image, position, scaledRect);
}


class AccountTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = AccountStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    //console.log(this.handlers);
    AccountStore.listen(this.onChange);
    AccountActions.init();
  }

  componentWillUnmount() {
    AccountStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }
  onSubmit = (e) => {
    e.preventDefault();
    let {formFirstName, formLastName, formEmail} = this.state;
    AccountActions.updateAccountInfo({formFirstName, formLastName, formEmail});
  }

  onFirstNameChange = (e) => {
    this.setState({formFirstName: e.currentTarget.value});
  }
  onLastNameChange = (e) => {
    this.setState({formLastName: e.currentTarget.value});
  }
  onEmailChange = (e) => {
    this.setState({formEmail: e.currentTarget.value});
  }

  render () {
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset className="form-group">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input id="firstName" type="text" className="form-control" name="firstName" onChange={this.onFirstNameChange} value={this.state.formFirstName}/>
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor="surname" className="form-label">Last Name</label>
          <input id="surname" type="text" className="form-control" name="surname" onChange={this.onLastNameChange} value={this.state.formLastName}/>
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input id="email" type="email" className="form-control" name="email" onChange={this.onEmailChange} value={this.state.formEmail}/>
        </fieldset>

        <input className="btn btn-primary" type="submit" value="Save Changes"/>

        <hr/>
        <h3>Password</h3>
        <hr/><p>Click the "Reset Password" link below to be redirected to password reset page.</p>
        <a href="/change" className="btn btn-danger">Reset Password</a>

      </form>
    );
  }
}

class LinkAddButton extends React.Component {

  render () {
    return (
      <button data-index={this.props.index}
              onClick={this.props.onClick}
              title="append this link">

        <span style={{color: 'green'}}
              className="icon ion ion-plus"/>
      </button>
    );
  }
}

class LinkRemoveButton extends React.Component {

  render () {
    return (
      <button data-index={this.props.index}
              onClick={this.props.onClick}
              title="append this link">
        <span
          style={{color: 'red'}}
          className="icon ion-ios-trash"/>
      </button>
    );
  }
}


class ProfileTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = ProfileStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    //console.log(this.handlers);
    ProfileStore.listen(this.onChange);
    ProfileActions.init();
  }

  componentWillUnmount() {
    ProfileStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    let {avatar, bio, links, location, occupation} = this.state;
    ProfileActions.updateProfileInfo({avatar, bio, links, location, occupation});
  }

  onBioChange = (e) => {
    this.setState({bio: e.currentTarget.value});
  }
  onLocationChange = (e) => {
    this.setState({location: e.currentTarget.value});
  }
  onOccupationChange = (e) => {
    this.setState({occupation: e.currentTarget.value});
  }
  onLinkNameChange = (e) => {
    var links = this.state.links,
      link = links[e.currentTarget.dataset.index];
    link.name = e.currentTarget.value;
    this.setState({links});
  }
  onLinkUrlChange = (e) => {
    var links = this.state.links,
      link = links[e.currentTarget.dataset.index];
    link.url = e.currentTarget.value;
    this.setState({links});
  }

  onLinkAdd = (e) => {
    var links = this.state.links,
      link = links[links.length - 1];

    if (link.name.length > 4 && link.url.length > 4) {
      links.push({
        name: '',
        url: ''
      });
    }

    this.setState({links});
  }
  onLinkRemove = (e) => {
    var links = this.state.links;
    // do array splicing or push or pop I guess
    remove(links, (i, index) => {
      return index === parseInt(e.currentTarget.dataset.index);
    });
    this.setState({links});
  }

  compressedImage = src => {
    return new Promise((resolve, reject) => {
      try {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        let img = new Image();

        img.onload = () => {
          canvas.width = 150;
          canvas.height = 150;
          renderCentered(ctx, img, img, {width: 150, height: 150});
          resolve(canvas.toDataURL("image/webp"));
        }
        img.src = src;

      } catch (err) {
        reject(err);
      }
    });

  }

  onFileChange = (e) => {
    var reader = new FileReader();
    reader.onload = e => {
      console.log('loaded image', e.target.result);
      this.compressedImage(e.target.result)
        .then(data => {
        console.log('compressed data', data);
        this.setState({avatar: data});
      }).catch(err => console.error(err));
    }
    reader.readAsDataURL(e.target.files[0]);
  }
  render () {
    let {avatar, ready, bio, links, location, occupation} = this.state;

    if (!ready) {
      return (<div/>)
    }

    let linkFields = links.map((link, idx) => {
      return (
        <tr key={idx}>

          <td>
            <input
              data-index={idx}
              id={'name-' + idx}
              type="text"
              className="form-control"
              name={'url-' + idx}
              onChange={this.onLinkNameChange}
              placeholder='my cool website...'
              value={link.name} />
          </td>

          <td>
            <input
              data-index={idx}
              id={'name-' + idx}
              type="url"
              className="form-control"
              name={'url-' + idx}
              onChange={this.onLinkUrlChange}
              placeholder='http://example.com'
              value={link.url} />
          </td>
          <td>
            {idx === links.length -1 ?
              <LinkAddButton index={idx} onClick={this.onLinkAdd} /> :
              <LinkRemoveButton index={idx} onClick={this.onLinkRemove} />
            }
          </td>
        </tr>
      );
    });
    return (
      <form onSubmit={this.onSubmit}>

        <fieldset className="form-group">
          <label htmlFor="avatar" className="form-label">Avatar</label>
          <input type="file" id="avatar" className="form-control" name="avatar" onChange={this.onFileChange} />
          <img src={avatar} style={{maxWidth: '150px'}}/>
          <input type="hidden" value={avatar} />
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor="bio" className="form-label">Bio</label>
          <textarea id="bio" className="form-control" name="bio" onChange={this.onBioChange} value={bio}/>
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor="occupation" className="form-label">Occupation</label>
          <input id="occupation" type="text" className="form-control" name="occupation" onChange={this.onOccupationChange} value={occupation}/>
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor="location" className="form-label">Location</label>
          <input id="location" type="text" className="form-control" name="location" onChange={this.onLocationChange} value={location}/>
        </fieldset>

        <fieldset className="form-group">
          <legend><strong>Links</strong></legend>
          <table>

            <thead><tr><th>Link Name</th><th>URL</th><th>Control</th></tr></thead>

            <tbody>
            {linkFields}
            </tbody>
          </table>
        </fieldset>

        <input className="btn btn-primary" type="submit" value="Update Profile"/>

      </form>
    );
  }

}

export default class Account extends React.Component {

  constructor(props) {
    super(props);
    this.state = AccountStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    //console.log(this.handlers);
    AccountStore.listen(this.onChange);
    AccountActions.init();
  }

  componentWillUnmount() {
    AccountStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  setTab = (e) => {
    AccountActions.setTab(e.currentTarget.id);
  }

  render () {
    return (
      <div className="pagewrapper">
        <h2 style={{marginBottom: '28px'}}>My Account </h2>
        <div className="tabs">
          <ul style={{marginBottom: '28px'}}className="tab-list">
            <li><button className={this.state.activeTab === "account" ? "active" : ""} id="account" onClick={this.setTab}>Edit Account</button></li>
            <li><button className={this.state.activeTab === "profile" ? "active" : ""} id="profile" onClick={this.setTab}>Edit Profile</button></li>
          </ul>
        </div>
        {this.state.activeTab === "account" ?
          <AccountTab /> :
          this.state.activeTab === "profile" ?
            <ProfileTab /> :
            ''
        }


      </div>
    );
  }

};
