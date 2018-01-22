import React from 'react';

class MenuContainer extends React.Component {
  constructor()
  {
    super();
    this.handleSelectAssociation = this.handleSelectAssociation.bind(this);
  }
  handleSelectAssociation(event){
    console.log(event.target.value);
    this.props.handleSelectAssociation(event.target.value);
  }
  render() {

      var renderedResult = this.props.authorizedModules.map((mod) => {
        const slug =  mod.slug;
        const name =  mod.name;
        const icon = mod.icon;
        return (
           <li key={name}>
            <div className="menu-row">
              <div className="menu-row-icon">
                <i className={icon}> </i>
              </div>

              <div className="menu-row-title">
                <p onClick={() => this.props.changeModule(name) }>{slug}</p>
              </div>
            </div>
          </li>
        );
      });

    return (
      <div className="menu-container">
        <div className="menu">
            <div className="menu-association">
              <div className="menu-association-title">
                <p onClick={() => this.props.changeModule("Associations") }>Associations</p>
              </div>
              <div className="menu-association-select">
                <select onChange={this.handleSelectAssociation}>
                  <option></option>
                  <option value="1">adasd asdasd</option>
                  <option value="2">asddddddddddddd</option>
                </select>
              </div>
            </div>

            <div className="menu-role">
              <div className="HiddenScrollBar">
                <ul>
                  {renderedResult}
                </ul>
              </div>
            </div>
            <div className="menu-footer">
              
            </div>
        </div>
        <div className="menu-button">
          <button onClick={this.props.handleClickCloseOpenMenu}></button>
        </div>
      </div>
    );
  }
}

export default MenuContainer;