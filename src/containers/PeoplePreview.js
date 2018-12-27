import React from 'react';

class PeoplePreview extends React.Component {
  componentDidMount() {
    const { messages, peopleData, match, getPersonData } = this.props;
    const message = messages.find(m => m.id === +match.params.messageId);

    if (!message) return;
    const people = [message.from, message.to, ...message.cc];

    people.forEach(email => {
      if (!peopleData.people[email]) getPersonData(email);
    });
  }

  render() {
    return <div>PeoplePreview</div>;
  }
}

export default PeoplePreview;
