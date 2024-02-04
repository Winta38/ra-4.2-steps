import React from 'react';
import editIcon from '../img/editIcon.png';
import deleteIcon from '../img/deleteIcon.png';

export function Data({ tracks, handleDelete, handleEdit }) {
    const sortedTracks = [...tracks].sort((a, b) => b.data.getTime() - a.data.getTime());

    return (
        <div>
            <p className='list'>
                <span>Дата(ДД.ММ.ГГ)</span>
                <span>Пройдено км</span>
                <span>Действия</span>
            </p>
            <ul className='track_list'>
                {sortedTracks.map((track) => (
                    <li key={track.id} className='track'>
                        <span>{track.data.toLocaleDateString()}</span>
                        <span>{track.value}</span>
                        <div>
                            <button className='btn_edit' onClick={() => handleEdit(track)}>
                                <img src={editIcon} alt='Edit' />
                            </button>
                            <button className='btn_delete' onClick={() => handleDelete(track)}>
                                <img src={deleteIcon} alt='Delete' />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
