const API_BASE_URL = 'http://localhost:5111';

const config = {
  endpoints: {
    Product: `${API_BASE_URL}/api/Product`,
    Order: `${API_BASE_URL}/api/Order`,
    Waiter: `${API_BASE_URL}/api/Waiter`,
    Table: `${API_BASE_URL}/api/Table`,
  },
};

export default config;