import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Data } from './Data';
import { Record } from './Record';

export default function Form() {
  const [tracks, setTracks] = useState([
    { id: 1, data: new Date(2023, 5, 27), value: 10 },
    { id: 2, data: new Date(2023, 5, 28), value: 5.4 },
  ]);

  const [data, setData] = useState('');
  const [dist, setDist] = useState('');
  const [editingTrack, setEditingTrack] = useState(null);

  const handleFormChange = (evt) => {
    const { name, value } = evt.target;
    if (name === 'data') {
      setData(value);
    }
    if (name === 'dist') {
      if (Number(value) <= 0) {
        return;
      }
      setDist(Number(value));
    }
  };

  const handleAddTrack = (evt) => {
    evt.preventDefault();
    if (data === '' || dist === '') {
      return;
    }
    const d = data.split('.');
    const newData = new Date(d[2], d[1] - 1, d[0]);
    if (isNaN(newData.getTime())) {
      return;
    }
    if (editingTrack) {
      const updatedTracks = tracks.map((track) =>
        track.id === editingTrack.id ? { ...track, data: newData, value: dist } : track
      );
      setTracks(updatedTracks);
      setEditingTrack(null);
    } else {
      const existingTrack = tracks.find((track) => track.data.getTime() === newData.getTime());
      if (existingTrack) {
        const updatedTracks = tracks.map((track) =>
          track.id === existingTrack.id ? { ...track, value: track.value + dist } : track
        );
        setTracks(updatedTracks);
      } else {
        const newTrack = { id: uuidv4(), data: newData, value: dist };
        setTracks((prevTracks) => [...prevTracks, newTrack]);
      }
    }
    setData('');
    setDist('');
  };

  const handleDelete = (track) => {
    setTracks((prevTracks) => prevTracks.filter((o) => o.id !== track.id));
  };

  const handleEdit = (track) => {
    setData(track.data.toLocaleDateString());
    setDist(track.value);
    setEditingTrack(track);
  };

  return (
    <>
      <Record
        data={data}
        dist={dist}
        handleFormChange={handleFormChange}
        handleAddTrack={handleAddTrack}
        editingTrack={editingTrack}
      />
      <Data tracks={tracks} handleDelete={handleDelete} handleEdit={handleEdit} />
    </>
  );
}
