import api from './client';

/**
 * Creates a new user account.
 * @param {object} accountData - { firstName, lastName, email, password }
 * @returns {Promise<object>} The created account object.
 */
export const createAccount = async (accountData) => {
    const method = 'POST';
    const endpoint = '/accounts';

    console.log(`📡 API CALL: ${method} ${endpoint}`, accountData);

    const response = await api(endpoint, {
        method: method,
        data: accountData
    });

    // Returns the created user object (usually includes the new _id)
    return response.data || response;
};


/**
 * Retrieves a specific account by ID.
 * @param {string} accountId - The ID of the account to fetch.
 * @returns {Promise<object>} The account details.
 */
export const getAccount = async (accountId) => {
    const method = 'GET';
    const endpoint = `/accounts/${accountId}`;

    console.log(`📡 API CALL: ${method} ${endpoint}`);

    const response = await api(endpoint);

    return response.data || response;
};

/**
 * Updates an existing account.
 * @param {string} accountId - The ID of the account to update.
 * @param {object} updates - Fields to update (e.g., { firstName: "NewName" })
 * @returns {Promise<object>} The updated account object.
 */
export const updateAccount = async (accountId, updates) => {
    const method = 'PUT';
    const endpoint = `/accounts/${accountId}`;

    console.log(`📡 API CALL: ${method} ${endpoint}`, updates);

    const response = await api(endpoint, {
        method: method,
        data: updates
    });

    return response.data || response;
};

/**
 * Deletes a user account.
 * @param {string} accountId - The ID of the account to delete.
 * @returns {Promise<void>}
 */
export const deleteAccount = async (accountId) => {
    const method = 'DELETE';
    const endpoint = `/accounts/${accountId}`;

    console.log(`📡 API CALL: ${method} ${endpoint}`);

    await api(endpoint, {
        method: method
    });
};