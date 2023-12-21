'use strict';
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserProfile)
    }

    static async add(input, profileModel) {
      const userCreated = await User.create({
        email: input.email,
        password: input.password
      })

      await profileModel.create({
        name: input.username,
        UserId: userCreated.id
      })
    }

    static async login(req) {
      let input = req.body
      const account = await User.findOne({
        attributes: [
          "id",
          "role",
          "email",
          "password",
        ],
        where: {
          email: input.email
        }
      })

      req.session.role = account.role

      if(account) {
        const isValidPassword = bcrypt.compareSync(input.password, account.password)
        if(isValidPassword) {
          return account.id
        }
      }

      throw new Error('Invalid password or username.')
    }
  }
  User.init({
    role: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Username is required."
        },
        notEmpty: {
          args: true,
          msg: "Username is required."
        },
        notContains: {
          args: ' ',
          msg: "Spacebar not allowed."
        },
        async notSame(value) {
          const usernameUser = await User.findOne({
            attributes: [
              "username"
            ],
            where: {
              username: {
                [Op.like]: value
              }
            }
          })
          
          if(usernameUser) {
            throw new Error('Username already use.')
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Email is required."
        },
        notEmpty: {
          args: true,
          msg: "Email is required."
        },
        isEmail: {
          args: true,
          msg: "Email is not valid."
        },
        async notSame(value) {
          const emailUser = await User.findOne({
            attributes: [
              "email"
            ],
            where: {
              email: {
                [Op.like]: value
              }
            }
          })
          
          if(emailUser) {
            throw new Error('Email already use.')
          }
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Password is required."
        },
        notEmpty: {
          args: true,
          msg: "Password is required."
        },
        len: {
          args: [8],
          msg: "Password need at least 8 characters."
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, _) => {
        // const salt = bcrypt.genSaltSync()
        // const hash = bcrypt.hashSync(user.password, salt)

        // user.username = user.username.toLowerCase()
        // user.email = user.email.toLowerCase()
        // user.password = hash
        // if(user.role !== 'Admin') user.role = "User"
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};