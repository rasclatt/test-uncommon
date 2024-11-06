import { useEffect, useState } from 'react'
import { TextField, Box, Button } from '@mui/material';
import { createItem, deleteItem, getItem, IItem } from './services/items.service';
import 'bootstrap/dist/css/bootstrap.min.css';
import './media/styles/global.scss';

const defaultItem: IItem = { id: '', name: '', description: '' };

const App = () => {
  const [ itemsState, setItemsState ] = useState<{ready: boolean, loading: boolean, items: IItem[]}>({ready: false, loading: false, items: []});
  const [ state, setState ] = useState<{ready: boolean, loading: boolean}>({ready: false, loading: false});
  const [ msg, setMsg ] = useState<{success: boolean, msg: string}>({success: false, msg: ``});
  const [ formData, setFormData ] = useState<IItem>(defaultItem);

  const clearForm = () => setFormData(defaultItem);

  const onChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onSubmitEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!state.loading) {
      setState({ ...state, loading: true });
      const resp = await createItem(formData);
      if(resp) {
        setFormData(resp);
        setMsg({ success: true, msg: `Item created successfully` });
      }
      setState({ ready: true, loading: false });
      setItemsState({ ...itemsState, ready: false, loading: false });
    }
  };

  useEffect(() => {
    if(!itemsState.ready) {
      if(!itemsState.loading) {
        setItemsState({ ...itemsState, loading: true });
        getItem().then((resp) => {
          setItemsState({ ready: true, loading: false, items: Array.isArray(resp)? resp : [resp] });
          clearForm();
        });
      }
    }
  }, [itemsState]);

  const onDeleteEvent = async (id: string) => {
    const resp = await deleteItem(id);
    if(resp) {
      setItemsState({ ready: false, loading: false, items: [] });
      setMsg({ success: true, msg: `Item deleted successfully` });
      clearForm();
    }
  }

  return (
    <div className='col-count-3 offset'>
      <div className="start2">
        { msg.msg &&
          <div className={`alert alert-${msg.success? 'success' : 'danger'} d-flex justify-content-between`}>
            <span>{ msg.msg }</span><a href="#" onClick={() => setMsg({...msg, msg: ''})} className="close" style={{textDecoration: 'none'}}>&times;</a>
          </div> }
        <Box component="form" onSubmit={onSubmitEvent} noValidate autoComplete="off">
          <input
            type="hidden"
            name="id"
            value={ formData.id || '' }
          />
          <TextField
            label="Name"
            name="name"
            value={ formData.name || ''}
            onChange={onChangeEvent}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            name="description"
            value={ formData.description || ''}
            onChange={onChangeEvent}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" disabled={ state.loading || formData?.name?.length === 0 || formData?.description?.length === 0 } color="primary">Submit</Button>
        </Box>
        {
          itemsState.ready && itemsState.items.map((item, i) => (
            <div key={i} className='border shadow p-3 rounded d-flex justify-content-between mt-4'>
              <div>
                <h3>{ item.name }</h3>
                <p>{ item.description }</p>
              </div>
              <div>

                <Button onClick={() => onDeleteEvent(item.id as string)} variant="contained" color="secondary" size='small'>Delete</Button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App;
