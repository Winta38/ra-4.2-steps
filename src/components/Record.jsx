import React from 'react';

function Record({ data, dist, handleFormChange, handleAddTrack, editingTrack }) {
  return (
    <div className='form_record'>
      <form onSubmit={handleAddTrack} className='form_row'>
        <div className='form_column'>
          <input type='text' name='data' placeholder='Дата (ДД.ММ.ГГ)' value={data} onChange={handleFormChange} />
        </div>
        <div className='form_column'>
          <input type='number' name='dist' placeholder='Пройдено км' value={dist} onChange={handleFormChange} />
        </div>
        <button type='submit' className='btn_submit'>{editingTrack ? 'SAVE' : 'OK'}</button>
      </form>
    </div>
  );
}

export { Record };
export default Record;
