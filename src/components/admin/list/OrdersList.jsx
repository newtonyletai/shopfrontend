import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ordersEdit, ordersFetch } from '../../../features/ordersSlice';
import moment from 'moment';

export default function OrdersList() {
  const navigate = useNavigate()
  const { list } = useSelector((state) => state.orders)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(ordersFetch())
  },[dispatch])

  const rows = list && list.map((order) => {
    return {
      id: order._id,
      cName: order.shipping.name,
      amount: (order.total / 100)?.toLocaleString(),
      dStatus: order.delivery_status,
      date: moment(order.createdAt).fromNow(), 
    }
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'cName', headerName: 'Name', width: 130,
    
    },

    { field: 'amount', headerName: 'Amount($)', width: 100 },
    {
      field: 'dStatus',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => {
        return (
          <div>
          {params.row.dStatus === "pending" ? (
            <Pending>Pending</Pending>
          ) : params.row.dStatus === "dispatched" ? (
            <Dispatched>Dispatched</Dispatched>
          ) : params.row.dStatus === "delivered" ? (
            <Delivered>Delivered</Delivered>
          ) : (
            "error"
          )}
          </div>
        )
      }
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 120,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 220,
     renderCell: (params) => {
        return (
          <Actions>
              <DispatchBtn onClick={() => handleOrderDispatch(params.row.id)} >
                Dispatch
              </DispatchBtn>
              <DeliveryBtn onClick={() => handleOrderDeliver(params.row.id)} >
                Deliver
              </DeliveryBtn>
              <View onClick={() => navigate(`/order/${params.row.id}`)} >Veiw</View>
          </Actions>
        )
     }
    },
  ];

  const handleOrderDispatch = (id) => {
    dispatch(
      ordersEdit({
        id,
        delivery_status: "dispatched",
      })
      );
  };
  const handleOrderDeliver = (id) => {
    dispatch(
      ordersEdit({
        id,
        delivery_status: "delivered",
      })
      );
  };

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

const DispatchBtn = styled.button`
    background-color: rgb(38, 198, 249);
`
const DeliveryBtn = styled.button`
    background-color: rgb(102, 108, 255);
`
const View = styled.button`
    background-color: rgb(114, 225, 40);
`
const Pending = styled.div`
    color: rgb(253, 181, 40);
    background: rgba(253, 181, 40, 0.12);
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 14px;
`
const Dispatched = styled.div`
    color: rgb(38, 198, 249);
    background: rgba(38, 198, 249, 0.12);
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 14px;
`
const Delivered = styled.div`
    color: rgb(102, 108, 255);
    background: rgba(102, 108, 255, 0.12);
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 14px;
`