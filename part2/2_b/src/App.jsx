import { useState, useEffect, useRef } from 'react';
import Notification from './components/Notification.jsx';
import contactService from './services/contacts.js';

// 单条个人信息
const PersonalInfo = ({person, onDelete}) => {
  const deleteContact = () => {
    if (window.confirm(`Are you sure to delete ${person.name} ?`)) {
      onDelete(person);
    }
  };
  return (
    <div>
      <li>
        {person.name} {person.number}
        <button onClick={deleteContact}>Delete</button>
      </li>
    </div>
  );
};

// 过滤器
const Filter = ({filter, changeHandler}) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        Filter shown with <input value={filter} onChange={changeHandler} />
      </div>
    </form>
  );
};

// 添加新联系人
const AddNew = ({formData}) => {
  return (
    <div>
      <h2>Add a New</h2>
      <form onSubmit={formData.addPerson}>
        <div>
          name: <input value={formData.newName} onChange={formData.handleNameChange}/>
        </div>
        <div>
          number: <input value={formData.newNum} onChange={formData.handleNumChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

// Numbers - 渲染联系人列表
const Phonebook = ({persons, searchFilter, onDelete}) => {
  const filteredPersons = persons.filter(person =>
  person.name.toLowerCase().includes(searchFilter.toLowerCase())
);
  return (
    <div>
    <h2>Numbers</h2>
          <ul>
            {filteredPersons.map(person =>
              <PersonalInfo key={person.id} person={person} onDelete={onDelete} />
            )}
          </ul>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [message, setMessage] = useState({
    content: null,
    type: null
  }); // 页面顶部的通知
  const messageTimerRef = useRef(null);

  /**
   * @brief 显示通知
   * @param {通知内容} text 
   * @param {通知类型} type success / warning / error
   * @param {显示时间（毫秒）} duration
   */
  const showMessage = (text, type = 'warning', duration = 3000) => {
    setMessage({
      content: text,
      type: type
    });
    if (messageTimerRef.current) {
      clearTimeout(messageTimerRef.current);
    }
    messageTimerRef.current = setTimeout(() => setMessage({ content: null, type: null }), duration);
  };

  // 自增 ID
  const nextId = () => {
    const numericIds = persons
      .map(person => Number(person.id))
      .filter(id => Number.isFinite(id));
    const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
    return String(maxId + 1);
  };

  // 从 json-server 获取数据
  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts);
      })
      // 抓取错误
      .catch(error => {
        console.log('error fetching data:', error);
      });
  }, []);

    // 将newName和newNum整合成联系人对象
    const personObject = {
      id: nextId(),
      name: newName,
      number: newNum,
    };

  // 新建联系人
  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some(p => p.name === newName)) {
      if (persons.some(p => p.number === newNum)) {
        alert(`You have already added a same number for ${newName}.`);
      } else if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one (${newNum}) ?`)) {
        // 如果检测到输入已存在的名字，会询问是否要替换number
        const existingPerson = persons.find((p) => p.name === newName);
        const updatedPerson = { ...existingPerson, number: newNum };
        contactService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id === returnedPerson.id ? returnedPerson : p));
            setNewName('');
            setNewNum('');
          })
          .catch(error =>{
            console.log('error update person:', error);
          });
        return;
      }
    }
  
  
    // 将新条目的信息发送到服务端
    contactService
      .create(personObject)
      .then(data => {
        setPersons(persons.concat(data));
        setNewName('');
        setNewNum('');
        showMessage(`${data.name} - ${data.number} has been added to the phonebook.`, "success");
      })
      .catch(error => {
        console.log('error adding person:', error);
      });
  };

  /* --- Event Handlers Begin --- */
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumChange = (event) => {
    setNewNum(event.target.value);
  }
  const handleSearchChange = (event) => {
    setSearchFilter(event.target.value);
  }
  /* --- Event Handlers End --- */

  // 将删除条目发送到服务端（DELETE 方法）
  const deletePerson = (person) => {
    contactService
      .delete(person.id)
      .then(() => {
        // filter 方法 : 浅拷贝数组，根据filter过滤，再返回一个新数组
        setPersons(persons.filter(p => p.id !== person.id));
        showMessage(`${person.name} - ${person.number} has just been removed from the phonebook.`, 'warning');
      })
      .catch(error => {
        console.log('error deleting person:', error);
        showMessage(`${person.name} - ${person.number} does not exist in the server. Maybe it has been removed by other users?`, "error", 5000);
        setPersons(persons.filter(p => p.id !== person.id));
      });
  };

  return (
    <div>
      <Notification message={message.content} notifType={message.type}/>
      <h2>Phonebook</h2>
      <Filter filter={searchFilter} changeHandler={handleSearchChange}/>
      {/* 将AddNew组件需要的五个参数集中在 formData 数组中，避免重复写 "newName=newName" 的情况*/}
      <AddNew 
        formData={{
          newName,
          newNum,
          handleNameChange,
          handleNumChange,
          addPerson,
        }}
      />
      <Phonebook persons={persons} searchFilter={searchFilter} onDelete={deletePerson}/>
    </div>
  );
}

export default App