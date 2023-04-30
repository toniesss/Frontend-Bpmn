import React from 'react'
import './styles/Tableformkers.css'
import 'bootstrap/dist/css/bootstrap.min.css';
//import { format } from "date-fns";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

const Tableformskey = ({
  formList,
}) => {
  return (
    <div className='table-formkeys'>
        <table className='table table-hover bg-whith'>
            <thead>
                <tr>
                <th scope='col'>Form Name</th>
                <th scope='col'>Form Keys</th>
                <th scope='col'>Action</th>
                </tr>
            </thead>
            <tbody>
              {formList?.map((form) => (
                <tr key={form.id}>
                <td>{form.form_name}</td>
                <td>{form.form_key}</td>
                <td className="bt-group-workflowlist">
                <Link
                    className="edit-workflowlist"
                    to={`edit/${form.id}`}
                  >
                    <FiEdit />
                  </Link>
                  <button
                    className="delete-workflow"
                    onClick={() => {
                      'handdleDelete(workflow.id);'
                    }}
                  >
                    <MdDelete />
                  </button>
                </td>
                </tr>
              ))}
            </tbody>
        </table>
    </div>
  )
}

export default Tableformskey