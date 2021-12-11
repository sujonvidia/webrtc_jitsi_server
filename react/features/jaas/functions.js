// @flow

import { getVpaasTenant } from '../billing-counter/functions';

import logger from './logger';

/**
 * Sends a request for retrieving jaas customer details.
 *
 * @param {Object} reqData - The request info.
 * @param {string} reqData.appId - The client appId.
 * @param {string} reqData.baseUrl - The base url for the request.
 * @param {string} reqData.jwt - The JWT token.
 * @returns {void}
 */
export async function sendGetDetailsRequest({ appId, baseUrl, jwt }: {
    appId: string,
    baseUrl: string,
    jwt: string,
}) {
    const fullUrl = `${baseUrl}/v1/customers/${encodeURIComponent(appId)}`;
    const headers = {
        'Authorization': `Bearer ${jwt}`
    };

    try {
        const res = await fetch(fullUrl, {
            method: 'GET',
            headers
        });

        if (res.ok) {
            return res.json();
        }

        throw new Error('Request not successful');
    } catch (err) {
        throw new Error(err);

    }
}

/**
 * Returns the billing id for vpaas meetings.
 *
 * @param {Object} state - The state of the app.
 * @param {string} feature - Feature to be looked up for disable state.
 * @returns {boolean}
 */
export function isFeatureDisabled(state: Object, feature: string) {
    return state['features/jaas'].disabledFeatures.includes(feature);
}

/**
 * Sends a request for retrieving jaas JWT.
 *
 * @param {Object} reqData - The request info.
 * @param {string} reqData.appId - The client appId.
 * @param {string} reqData.baseUrl - The base url for the request.
 * @returns {void}
 */
export async function sendGetJWTRequest({ appId, baseUrl }: {
    appId: string,
    baseUrl: string
}) {
    const fullUrl = `${baseUrl}/v1/public/token/${encodeURIComponent(appId)}`;

    try {
        const res = await fetch(fullUrl, {
            method: 'GET'
        });

        if (res.ok) {
            return res.json();
        }

        throw new Error('Request not successful');
    } catch (err) {
        throw new Error(err);

    }
}

/**
 * Gets a jaas JWT.
 *
 * @param {Object} state - Redux state.
 * @returns {string} The JWT.
 */
export async function getJaasJWT(state: Object) {
    const baseUrl = state['features/base/config'].jaasTokenUrl;
    const appId = getVpaasTenant(state);

    const shouldSendRequest = Boolean(baseUrl && appId);

    if (shouldSendRequest) {
        try {
            const jwt = await sendGetJWTRequest({
                appId,
                baseUrl
            });

            return jwt.token;
        } catch (err) {
            logger.error('Could not send request', err);
        }
    }
}
