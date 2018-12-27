import React from 'react';

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
    const message = this.getMessage();

    // The redirect will occur from the Message component
    if (!message) return null;
    const people = [message.from, message.to, ...message.cc];

    return (
      <div className="people__container">
      
      </div>
    )
  }
}

export default PeopleList;
