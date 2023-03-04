"use strict";

var _require = require("../config/constants"),
    user_role = _require.user_role;

var ROLE_ADMIN = user_role.ROLE_ADMIN,
    ROLE_MODERATOR = user_role.ROLE_MODERATOR,
    ROLE_EMPLOYEE = user_role.ROLE_EMPLOYEE;

var userAuthTokenDTO = function userAuthTokenDTO(userInstance) {
  return {
    fullName: userInstance.get('fullName'),
    id: userInstance.get('id'),
    password: userInstance.get('password'),
    role: userInstance.get('role'),
    departmentid: userInstance.get('departmentid')
  };
};

var userDTO = function userDTO(userInstance) {
  return {
    firstName: userInstance.get('firstName'),
    lastName: userInstance.get('lastName'),
    salary: userInstance.get('salary'),
    birthday: userInstance.get('birthday'),
    email: userInstance.get('email'),
    id: userInstance.get('id'),
    password: userInstance.get('password'),
    role: userInstance.get('role'),
    departmentid: userInstance.get('departmentid')
  };
};

var createdUserDTO = function createdUserDTO(userInstance) {
  return {
    id: userInstance.get('id')
  };
};

var userFullDTO = function userFullDTO(userInstance) {
  return {
    firstName: userInstance.get('firstName'),
    lastName: userInstance.get('lastName'),
    salary: userInstance.get('salary'),
    birthday: userInstance.get('birthday'),
    email: userInstance.get('email'),
    id: userInstance.get('id'),
    createdAt: userInstance.get('createdAt'),
    updatedAt: userInstance.get('updatedAt')
  };
};

var UserModelBuilder = function UserModelBuilder(DataTypes, sequelize) {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      field: 'firstname'
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'lastname'
    },
    salary: {
      type: DataTypes.INTEGER
    },
    departmentid: {
      type: DataTypes.UUID,
      allowNull: true
    },
    birthday: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.ENUM(ROLE_ADMIN, ROLE_MODERATOR, ROLE_EMPLOYEE)
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'createdat'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updatedat'
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get: function get() {
        var rawValue = this.getDataValue('firstName') + ' ' + this.getDataValue('lastName');
        return rawValue ? rawValue : null;
      }
    }
  }, {
    sequelize: sequelize,
    freezeTableName: true,
    tableName: 'user'
  });

  User.associate = function (models) {
    var UserInitialised = models.User,
        Department = models.Department;
    UserInitialised.belongsTo(Department, {
      foreignKey: 'departmentid',
      as: 'department'
    });
  };

  return User;
};

module.exports = {
  builder: UserModelBuilder,
  userAuthTokenDTO: userAuthTokenDTO,
  userFullDTO: userFullDTO,
  userDTO: userDTO,
  createdUserDTO: createdUserDTO
};