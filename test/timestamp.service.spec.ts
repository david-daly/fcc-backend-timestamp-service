import { expect } from 'chai';
import 'mocha';
import { TimestampService } from '../src/services/timestamp.service';

const validUnix = 1450137600;
const invalidUnix = -8640000000001;
const validNatural = 'December%2015,%202015';
const invalidNatural = 'December%2015,%202015sYU';

const createEvent = (timestring) => {
    return {
        pathParameters: {
            timestring,
        },
    };
};

describe('Get Parsed Date', () => {
    describe('When Valid Unix Timestamp entered', () => {
        it('should return Unix timestamp and natural date', () => {
            const event = createEvent(validUnix);
            const service = new TimestampService(event);
            const result = service.getParsedTimestamp();

            expect(result.unix).to.equal(1450137600);
            expect(result.natural).to.equal('December 2, 2015');
        });
    });

    describe('When Valid String Timestamp entered', () => {
        it('should return Unix timestamp and natural date', () => {
            const event = createEvent(validNatural);
            const service = new TimestampService(event);
            const result = service.getParsedTimestamp();

            expect(result.unix).to.equal(1450137600);
            expect(result.natural).to.equal('December 15, 2015');
        });
    });

    describe('When Invalid Unix Timestamp entered', () => {
        it('should return Unix timestamp and natural date', () => {
            const event = createEvent(invalidUnix);
            const service = new TimestampService(event);
            const result = service.getParsedTimestamp();

            expect(result.unix).to.equal(null);
            expect(result.natural).to.equal(null);
        });
    });

    describe('When Invalid String Timestamp entered', () => {
        it('should return Unix timestamp and natural date', () => {
            const event = createEvent(invalidNatural);
            const service = new TimestampService(event);
            const result = service.getParsedTimestamp();

            expect(result.unix).to.equal(null);
            expect(result.natural).to.equal(null);
        });
    });
});
