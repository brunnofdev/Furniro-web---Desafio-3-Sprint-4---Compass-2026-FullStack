export const swaggerDocument = {
  openapi: '3.0.3',
  info: {
    title: 'Furniro API',
    version: '1.0.0',
    description: 'API for browsing Furniro store products.'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local server'
    }
  ],
  tags: [
    {
      name: 'Products',
      description: 'Product browsing'
    },
    {
      name: 'Auth',
      description: 'Authentication operations (Login & Register)'
    }
  ],
  paths: {
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register a new user',
        description: 'Creates a new user account with name, email, and password.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'Brunno' },
                  email: { type: 'string', example: 'brunnodev@gmail.com' },
                  password: { type: 'string', example: 'senhaSegura123' }
                },
                required: ['name', 'email', 'password']
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'User successfully registered',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', example: 'b5aa3103-293a-4b83-bd30-a8218a47805a' },
                    name: { type: 'string', example: 'Brunno' },
                    email: { type: 'string', example: 'brunnodev@gmail.com' }
                  }
                }
              }
            }
          },
          '400': { description: 'Invalid input data or email already exists' }
        }
      }
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login a user',
        description: 'Authenticates a user and returns a JWT token.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string', example: 'brunnodev@gmail.com' },
                  password: { type: 'string', example: 'senhaSegura123' }
                },
                required: ['email', 'password']
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Login successful',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                    user: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', example: 'b5aa3103-293a-4b83-bd30-a8218a47805a' },
                        name: { type: 'string', example: 'Brunno' },
                        email: { type: 'string', example: 'brunnodev@gmail.com' }
                      }
                    }
                  }
                }
              }
            }
          },
          '401': { description: 'Invalid credentials' }
        }
      }
    },

    '/products': {
      get: {
        tags: ['Products'],
        summary: 'List products',
        description: 'Returns paginated products with filtering, search, and sorting support.',
        parameters: [
          {
            name: 'page',
            in: 'query',
            description: 'Current page.',
            schema: { type: 'integer', minimum: 1, default: 1 }
          },
          {
            name: 'limit',
            in: 'query',
            description: 'Number of items per page. The maximum limit is 100.',
            schema: { type: 'integer', minimum: 1, maximum: 100, default: 10 }
          },
          {
            name: 'category',
            in: 'query',
            description: 'Filters products by category.',
            schema: { type: 'string', example: 'dining' }
          },
          {
            name: 'search',
            in: 'query',
            description: 'Searches products by name.',
            schema: { type: 'string', example: 'chair' }
          },
          {
            name: 'minPrice',
            in: 'query',
            description: 'Minimum price.',
            schema: { type: 'number', example: 500000 }
          },
          {
            name: 'maxPrice',
            in: 'query',
            description: 'Maximum price.',
            schema: { type: 'number', example: 3500000 }
          },
          {
            name: 'sort',
            in: 'query',
            description: 'Field used for sorting.',
            schema: {
              type: 'string',
              enum: ['id', 'price', 'name', 'category'],
              default: 'id'
            }
          },
          {
            name: 'order',
            in: 'query',
            description: 'Sorting direction.',
            schema: { type: 'string', enum: ['ASC', 'DESC'], default: 'ASC' }
          }
        ],
        responses: {
          '200': {
            description: 'Paginated product list.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/PaginatedProducts' }
              }
            }
          },
          '500': {
            description: 'Internal server error.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      }
    },
    '/products/{identifier}': {
      get: {
        tags: ['Products'],
        summary: 'Find product by id or slug',
        parameters: [
          {
            name: 'identifier',
            in: 'path',
            required: true,
            description: 'Numeric id or product slug.',
            schema: { type: 'string', example: 'syltherine' }
          }
        ],
        responses: {
          '200': {
            description: 'Product found.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Product' }
              }
            }
          },
          '404': {
            description: 'Product not found.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          '500': {
            description: 'Internal server error.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      PaginatedProducts: {
        type: 'object',
        required: ['data', 'page', 'limit', 'totalItems', 'totalPages'],
        properties: {
          data: {
            type: 'array',
            items: { $ref: '#/components/schemas/Product' }
          },
          page: { type: 'integer', example: 1 },
          limit: { type: 'integer', example: 10 },
          totalItems: { type: 'integer', example: 8 },
          totalPages: { type: 'integer', example: 1 }
        }
      },
      Product: {
        type: 'object',
        required: [
          'id',
          'slug',
          'sku',
          'name',
          'category',
          'price',
          'finalPrice',
          'discount',
          'isNew',
          'image',
          'description',
          'gallery',
          'colors',
          'sizes',
          'complementaryDescription',
          'additionalInfo'
        ],
        properties: {
          id: { type: 'integer', example: 1 },
          slug: { type: 'string', example: 'syltherine' },
          sku: { type: 'string', example: 'FUR-DIN-001' },
          name: { type: 'string', example: 'Syltherine' },
          category: { type: 'string', example: 'dining' },
          price: { type: 'number', example: 3500000 },
          finalPrice: { type: 'number', example: 2450000 },
          discount: { type: 'number', example: 30 },
          isNew: { type: 'boolean', example: false },
          image: { type: 'string', example: 'prod-1.jpeg' },
          description: { type: 'string', example: 'Stylish cafe chair' },
          gallery: {
            type: 'array',
            items: { type: 'string' },
            example: ['prod-1.jpeg']
          },
          colors: {
            type: 'array',
            items: { $ref: '#/components/schemas/ProductColor' }
          },
          sizes: {
            type: 'array',
            items: { $ref: '#/components/schemas/ProductSize' }
          },
          badge: {
            type: 'string',
            nullable: true,
            example: '-30%'
          },
          badgeColor: {
            type: 'string',
            nullable: true,
            example: '#E97171'
          },
          complementaryDescription: {
            type: 'string',
            example: 'A comfortable chair with a contemporary silhouette.'
          },
          additionalInfo: {
            type: 'string',
            example: 'Structure: solid wood. Upholstery: polyester. Indoor use only.'
          }
        }
      },
      ProductColor: {
        type: 'object',
        required: ['name', 'value', 'priceModifier'],
        properties: {
          name: { type: 'string', example: 'Black' },
          value: { type: 'string', example: '#111827' },
          priceModifier: { type: 'number', example: 150000 }
        }
      },
      ProductSize: {
        type: 'object',
        required: ['name', 'priceModifier'],
        properties: {
          name: { type: 'string', example: 'M' },
          priceModifier: { type: 'number', example: 100000 }
        }
      },
      ErrorResponse: {
        type: 'object',
        required: ['statusCode', 'message', 'errors'],
        properties: {
          statusCode: { type: 'integer', example: 404 },
          message: { type: 'string', example: 'NotFoundException' },
          errors: { type: 'string', example: 'Product not found' }
        }
      }
    }
  }
};
