const departmentDTO = (departmentInstance) => {
  return {
    id: departmentInstance.get('id'),
    name: departmentInstance.get('name')
  }
}

const createdDepartmentDTO = (departmentInstance) => {
  return {
    id: departmentInstance.get('id')
  }
}

const departmentFullDTO = (departmentInstance) => {
  return {
    id: departmentInstance.get('id'),
    name: departmentInstance.get('name'),
    createdAt: departmentInstance.get('createdAt'),
    updatedAt: departmentInstance.get('updatedAt')
  }
}


const DepartmentModelBuilder = (DataTypes, sequelize) => {
  
  const Department = sequelize.define('Department', {

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
  },
  {
    sequelize: sequelize,
    freezeTableName: true,
    tableName: 'department'
  })

  Department.associate = (models) => {
    const {Department: DepartmentInitialized, User} = models;
    DepartmentInitialized.hasMany(User, {
      foreignKey: 'departmentid',
      sourceKey: 'id',
      as: 'user'
    })

  }

  return Department
}

module.exports = {
  builder: DepartmentModelBuilder,
  departmentDTO,
  createdDepartmentDTO
}