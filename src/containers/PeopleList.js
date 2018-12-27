import React from 'react';
import PersonPreview from '../components/PersonPreview';

class PeopleList extends React.Component {
  constructor(props) {
    super(props);

    this.loadPeople = this.loadPeople.bind(this);
    this.getMessage = this.getMessage.bind(this);
  }

  componentDidMount() {
    this.loadPeople();
  }

  getMessage() {
    const { messages, match } = this.props;
    return messages.find(m => m.id === +match.params.messageId);
  }

  loadPeople() {
    const { peopleData, getPersonData } = this.props;
    const message = this.getMessage();

    if (!message) return;
    const people = [message.from, message.to, ...message.cc];

    people.forEach(email => {
      if (!peopleData.people[email]) getPersonData(email);
    });
  }

  render() {
    const { people } = this.props.peopleData;
    const message = this.getMessage();

    // The redirect will occur from the Message component
    if (!message) return null;

    const fromData = people[message.from];
    const toData = people[message.to];
    const ccData = message.cc.map(e => people[e]);

    return (
      <div className="people__container">
        {fromData && <PersonPreview personData={fromData} header="From" />}
        {toData && <PersonPreview personData={toData} header="To" />}
        {ccData.map(p => {
          if (!p) return null;

          return <PersonPreview personData={p} header="CC" key={p.email} />;
        })}
      </div>
    );
  }
}

export default PeopleList;
