import * as actions from '../session_actions';

describe('actions', () => {
	it('should create an action to receive current user', () => {
		const user = {id: 1, email: "brentvale@gmail.com", name: "Brent Vale", website_url: "www.brentvale.com", tag_line: "I love to code"};
		const expectedAction = {
			type: actions.RECEIVE_CURRENT_USER,
			currentUser: user
		}
		expect(actions.receiveCurrentUser(user)).toEqual(expectedAction);
	});
});