import React from 'react';
import expect from 'expect';
import {convertToDisplayableDate} from '../shared_functions';

describe('convertToDisplayableDate', () => {
	it('converts 2017-06-19T17:00:51.000Z to June 19, 2017 10:00am PST', () => {
		let photoAttributeStoredAs = "2017-06-19T10:00:51.000Z";
		let desiredDisplayFormat = "Jun 19, 2017 10:00am";
		
		expect(convertToDisplayableDate(photoAttributeStoredAs)).toEqual(desiredDisplayFormat);
	})
})