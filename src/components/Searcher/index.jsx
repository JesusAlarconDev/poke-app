import {Input} from 'antd';

const Searcher = ({search, setSearch}) => {

  return (
    <Input.Search placeholder='Buscar ... ' style={{ marginBottom: 10 }} value={search} onChange={(e) => setSearch(e.target.value)} />
  )
}

export default Searcher