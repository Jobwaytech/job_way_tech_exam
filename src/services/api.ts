const API_URL = "https://job-way-tech-exam.onrender.com/api";

export const authAPI = {
  register: (data: any) =>
    fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(res => res.json()),
};

export const dataAPI = {
  list: (collection: string) =>
    fetch(`${API_URL}/data/${collection}`).then(res => res.json()),

  create: (collection: string, data: any) =>
    fetch(`${API_URL}/data/${collection}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(res => res.json()),

  update: (collection: string, id: string, data: any) =>
    fetch(`${API_URL}/data/${collection}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(res => res.json()),

  remove: (collection: string, id: string) =>
    fetch(`${API_URL}/data/${collection}/${id}`, {
      method: "DELETE"
    }).then(res => res.json())
};
