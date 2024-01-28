import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { userDelete, usersFetch } from '../../../features/usersSlice';

export default function UsersList() {
  const navigate = useNavigate()
  const { list } = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(usersFetch());
  }, [dispatch]);

  const rows = list && list.map((user) => {
    return {
      id: user._id,
      userName: user.name,
      userEmail: user.email,
      isAdmin: user.isAdmin,
     
    }
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'userName', headerName: 'Name', width: 150,},
    { field: 'userEmail', headerName: 'Email', width: 200 },
    {
      field: 'isAdmin',
      headerName: 'Role',
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            {params.row.isAdmin ? (
                <Admin>Admin</Admin>
            ) : (
                <Customer>Customer</Customer>
            )}
          </div>
        )
     },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 120,
     renderCell: (params) => {
        return (
          <Actions>
            <Delete onClick={() => handleDelete(params.row.id)} >Delete</Delete>
            <View onClick={() => navigate(`/user/${params.row.id}`)} >View</View>
          </Actions>
        )
     }
    },
  ];

  const handleDelete = (id) => {
    dispatch(userDelete(id))
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
}

const Actions = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  button {
    border: none;
    outline: none;
    padding: 3px 5px;
    color: white;
    border-radius: 3px;
    cursor:pointer;
  }
`
const Delete = styled.button`
  background-color: rgb(255, 77, 73);
`
const View = styled.button`
  background-color: rgb(114, 225, 40);
`
const Admin = styled.div`
    color: rgb(253, 181, 40);
    background: rgba(253, 181, 40, 0.12);
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 14px;
`
const Customer = styled.div`
    color: rgb(38, 198, 249);
    background: rgba(38, 198, 249, 0.12);
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 14px;
`