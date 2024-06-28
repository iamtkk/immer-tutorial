import { useRef, useCallback, useState } from "react";
import { produce } from "immer";

function App() {
  const nextId = useRef(1);
  const [form, setForm] = useState({ name: "", username: "" });
  const [data, setData] = useState({
    array: [],
    uselessValue: null,
  });
  const inputEl = useRef(null);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(
      produce((draft) => {
        draft[name] = value;
      })
    );
    // setForm((prevForm) =>
    //   produce(prevForm, (draft) => {
    //     draft[name] = value;
    //   })
    // );
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setData(
        produce((draft) => {
          draft.array.push({
            id: nextId.current,
            name: form.name,
            username: form.username,
          });
        })
      );
      // setData((prevData) =>
      //   produce(prevData, (draft) => {
      //     draft.array.push({
      //       id: nextId.current,
      //       name: form.name,
      //       username: form.username,
      //     });
      //   })
      // );
      // setData((prevData) => ({
      //   ...prevData,
      //   array: prevData.array.concat({
      //     id: nextId.current,
      //     name: form.name,
      //     username: form.username,
      //   }),
      // }));
      setForm({
        name: "",
        username: "",
      });
      nextId.current += 1;
      inputEl.current.focus();
    },
    [form.name, form.username]
  );

  const onRemove = useCallback((id) => {
    setData(
      produce((draft) => {
        draft.array.splice(
          draft.array.findIndex((info) => info.id === id),
          1
        );
      })
    );
    // setData(
    //   produce(data, (draft) => {
    //     draft.array.splice(
    //       draft.array.findIndex((info) => info.id === id),
    //       1
    //     );
    //   })
    // );
    // setData({ ...data, array: data.array.filter((info) => info.id !== id) });
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          placeholder="아이디"
          value={form.username}
          onChange={onChange}
          ref={inputEl}
        />
        <input
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>
      <div>
        <ul>
          {data.array.map((info) => (
            <li key={info.id} onClick={() => onRemove(info.id)}>
              {info.username} ({info.name})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
