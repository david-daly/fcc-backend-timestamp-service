import { TimestampService } from './services/timestamp.service';
import { Response } from './utils/Response';

export const handler = (event, context, callback) => {
    const service = new TimestampService(event);

    try {
        const payload = service.getParsedTimestamp();
        const response = new Response(200, payload);
        context.succeed(response);
    } catch (error) {
        context.fail(new Response(500, error));
    }
};
