import React from 'react';
import { Component } from "react";
import axios from 'axios'
import CRUDTable,
{
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from 'react-crud-table';
 
// Component's Base CSS
import './table-Crud.css';

const DescriptionRenderer = ({ field }) => <textarea {...field} />;
 
const SORTERS = {
  NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
  NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
  STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
  STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a)),
};
 
const getSorter = (data) => {
  const mapper = x => x[data.field];
  let sorter = SORTERS.STRING_ASCENDING(mapper);
 
  if (data.field === 'id') {
    sorter = data.direction === 'ascending' ?
      SORTERS.NUMBER_ASCENDING(mapper) : SORTERS.NUMBER_DESCENDING(mapper);
  } else {
    sorter = data.direction === 'ascending' ?
      SORTERS.STRING_ASCENDING(mapper) : SORTERS.STRING_DESCENDING(mapper);
  }
 
  return sorter;
};
 
 
// let count = tasks.length;
// const service = {
//   fetchItems: (payload) => {
//     let result = Array.from(tasks);
//     result = result.sort(getSorter(payload.sort));
//     return Promise.resolve(result);
//   },
//   create: (task) => {
//     count += 1;
//     tasks.push({
//       ...task,
//       id: count,
//     });
//     return Promise.resolve(task);
//   },
//   update: (data) => {
//     const task = tasks.find(t => t.id === data.id);
//     task.title = data.title;
//     task.description = data.description;
//     return Promise.resolve(task);
//   },
//   delete: (data) => {
//     const task = tasks.find(t => t.id === data.id);
//     tasks = tasks.filter(t => t.id !== task.id);
//     return Promise.resolve(task);
//   },
// };
 
const styles = {
  container: { margin: 'auto', width: 'fit-content' },
};
 
class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: Number,
      tasks: [],
      service : []
    }
  }

  // static getDerivedStateFromProps(props, state) {
  //   return {tasks: props.tasks };
  // }

  componentDidMount () {   
    axios.get('http://localhost:5000/notes')
    .then( (res) => {
      this.setState({ tasks: res.data });
      this.setState({ service: this.state.tasks.map(data => {      
          return {
            id: data.id,
            title: data.title,
            description: data.content,
          };
      })
      })
      
      console.log(this.state.tasks);
    
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  //To fetch items from mongose
    fetchItems = (payload) => {
      let result = Array.from(this.state.tasks);
      result = result.sort(getSorter(payload.sort));
      return Promise.resolve(result);
    }
    create = (task) => {
      var length = this.state.tasks.length + 1;
      this.state.count = length;
      this.setState({count: length});
      var tasks = this.state.tasks;     
      tasks.push({
        ...task,
        id: this.state.count,
      });
      axios.post('http://localhost:5000/notes', {
        ...task,
        id: this.state.count,
      })
      .then(res => {
        console.log(res.data);
      })
      this.setState({tasks: tasks});
      return Promise.resolve(task);
    }
    
    update = (data) => {
      var tasks = this.state.tasks ;
      const task = tasks.find(t => t._id === data._id);
      task.title = data.title;
      task.content = data.content;
      axios.put('http://localhost:5000/notes/' + task._id, task)
      .then(res => {
        console.log(res.data);
      })
      this.setState({tasks: tasks});
      return Promise.resolve(task);
    }

    delete = (data) => {
      var tasks = this.state.tasks ;
      const task = tasks.find(t => t.id === data.id);
      tasks = tasks.filter(t => t.id !== task.id);
      axios.delete('http://localhost:5000/notes/' + task._id, task)
      .then(res => {
        console.log(res.data);
      })
      this.setState({tasks: tasks});
      return Promise.resolve(task);
    }
    render() {
        return (

        <div style={styles.container}>
            <CRUDTable
              caption="Tasks"
              fetchItems={payload => this.fetchItems(payload)}
              items={this.state.tasks}
            >
            <Fields>
                <Field
                name="id"
                label="Id"
                hideInCreateForm
                />
                <Field
                name="title"
                label="Title"
                placeholder="Title"
                />
                <Field
                name="content"
                label="Description"
                render={DescriptionRenderer}
                />
            </Fields>
             <CreateForm
                title="Task Creation"
                message="Create a new task!"
                trigger="Create Task"
                onSubmit={task => this.create(task)}
                submitText="Create"
                validate={(values) => {
                const errors = {};
                if (!values.title) {
                    errors.title = 'Please, provide task\'s title';
                }
        
                if (!values.content) {
                    errors.description = 'Please, provide task\'s description';
                }
        
                return errors;
                }}
            />
        
            <UpdateForm
                title="Task Update Process"
                message="Update task"
                trigger="Update"
                onSubmit={task => this.update(task)}
                submitText="Update"
                validate={(values) => {
                const errors = {};
        
                if (!values.id) {
                    errors.id = 'Please, provide id';
                }
        
                if (!values.title) {
                    errors.title = 'Please, provide task\'s title';
                }
        
                if (!values.content) {
                    errors.description = 'Please, provide task\'s description';
                }
        
                return errors;
                }}
            />
        
             <DeleteForm
                title="Task Delete Process"
                message="Are you sure you want to delete the task?"
                trigger="Delete"
                onSubmit={task => this.delete(task)}
                submitText="Delete"
                validate={(values) => {
                const errors = {};
                if (!values.id) {
                    errors.id = 'Please, provide id';
                }
                return errors;
                }}
            />
            </CRUDTable>
        </div>
        
        );
    }
}

export default Example;