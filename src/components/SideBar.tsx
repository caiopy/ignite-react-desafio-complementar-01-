import { memo, useEffect, useState } from "react";

import { Button } from '../components/Button';

import { api } from '../services/api'


interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps {
  selectedGenreId: number;
  setSelectedGenreId: (id: number) => void;
}
function SideBarComponent({ selectedGenreId, setSelectedGenreId }: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []); //consumiu a api(json.server) pegando os dados fornecidos pelo json server, depois autualizou o estado de genres[uma array, no qual cada item recebe a as props definidas no GenreResponseProps] com setGenres. 

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }// faz com que cada botão da sidebar redirecione o usuario para o conteudo(definido pelo id) de cada genero 


  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}

export const SideBar = memo(SideBarComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.selectedGenreId, nextProps.selectedGenreId)
})