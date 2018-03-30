import './scss/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';

function Paragraph(props) {
  return (
    <div>
      <p>{props.content}</p>
    </div>
  );
}

function Button(props) {
  return <button onClick={ props.onClick }>{props.isBottom ? 'Move to top' : 'Move to bottom'}</button>;
}

class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: true,
      index: this.props.info[0].id,
      info: this.props.info[0].info,
      buttonText: "Move to top",
      isBottom: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.toggleLayout = this.toggleLayout.bind(this);
  }

  handleClick(info, i) {
    this.setState({
      index: i,
      info
    });
  }

  toggleLayout(props) {
    this.setState(prevState => ({
      isBottom: !prevState.isBottom
    }));
  }

  render() {
    const tabs = this.props.info.map((tab, i) =>
      <span key={i}
        className={ this.state.index === i ? "active" : "" }
        onClick={e => this.handleClick(tab.info, i)}>
        { tab.name }
      </span>
    );
    const bottomLayout = this.state.isBottom ? 'reverse' : '';

    return (
      <div className={`content-wrapper ${bottomLayout}`}>
        <div className="tabs-wrapper">{ tabs }</div>
        <section>
          <Paragraph content={this.state.info} />
        </section>
        <Button onClick={ this.toggleLayout } isBottom={ this.state.isBottom } />
      </div>
    );
  }
}

const content = [
  {
    'id': 0,
    'info': 'Walmart is in preliminary talks to buy insurer Humana, a deal that would mark a dramatic shift for the retail behemoth and would be the latest in a recent flurry of big deals in health-care services.',
    'name': 'Story 1'
  },
  {
    'id': 1,
    'info': 'Harvard hit a new low this year—in terms of its acceptance rate. The university admitted 4.6% of applicants for the class set to begin this fall, from 5.2% last year. Of the eight campuses that make up the Ivy League, seven posted a record-high number of applications.',
    'name': 'Story 2'
  },
  {
    'id': 2,
    'info': 'The Silicon Valley auto maker said the recall applies to sedans built before April 2016 after it discovered that certain corroding bolts in cold weather climates could lead to a power-steering failure',
    'name': 'Story 3'
  },
  {
    'id': 3,
    'info': 'Russia will expel U.S. and European diplomats and close the U.S. consulate general in St. Petersburg in response to measures taken against Russia over its alleged role in the poisoning of a former double agent in England.',
    'name': 'Story 4'
  }
];

function App() {
  return (
    <Content info={ content }/>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
