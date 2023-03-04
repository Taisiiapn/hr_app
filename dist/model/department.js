"use strict";

var departmentDTO = function departmentDTO(departmentInstance) {
  return {
    id: departmentInstance.get('id'),
    name: departmentInstance.get('name')
  };
};

var createdDepartmentDTO = function createdDepartmentDTO(departmentInstance) {
  return {
    id: departmentInstance.get('id')
  };
};

var departmentFullDTO = function departmentFullDTO(departmentInstance) {
  return {
    id: departmentInstance.get('id'),
    name: departmentInstance.get('name'),
    createdAt: departmentInstance.get('createdAt'),
    updatedAt: departmentInstance.get('updatedAt')
  };
};

var DepartmentModelBuilder = function DepartmentModelBuilder(DataTypes, sequelize) {
  var Department = sequelize.define('Department', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'createdat'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updatedat'
    }
  }, {
    sequelize: sequelize,
    freezeTableName: true,
    tableName: 'department'
  });

  Department.associate = function (models) {
    var DepartmentInitialized = models.Department,
        User = models.User;
    DepartmentInitialized.hasMany(User, {
      foreignKey: 'departmentid',
      sourceKey: 'id',
      as: 'user'
    });
  };

  return Department;
};

module.exports = {
  builder: DepartmentModelBuilder,
  departmentDTO: departmentDTO,
  createdDepartmentDTO: createdDepartmentDTO
};