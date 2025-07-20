const baseUrl = "http://localhost:3000";

export async function createNewAccount(data) {
  try {
    const response = await fetch(`${baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      return { error: result.error || result.message };
    }
    return { success: true, data: result };
  } catch (error) {
    return { error: error.message };
  }
}

export async function createRequest(data) {
  try {
    const response = await fetch(`${baseUrl}/buddyrequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      return { error: result.error || result.message };
    }
    return { success: true, data: result };
  } catch (error) {
    return { error: error.message };
  }
}

export async function login(data) {
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      return { error: result.message };
    }
    return { success: true, data: result };
  } catch (error) {
    return { error: error.message };
  }
}

export async function getProfile() {
  try {
    const response = await fetch(`${baseUrl}/profile`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to get profile", error.message);
  }
}

export async function getMe() {
  try {
    const response = await fetch(`${baseUrl}/me`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to get me", error.message);
  }
}

export async function logout() {
  try {
    const response = await fetch(`${baseUrl}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to logout", error.message);
  }
}
export async function editProfile(data) {
  try {
    const response = await fetch(`${baseUrl}/profile/edit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed edit profile", error.message);
    return null;
  }
}

export async function getLocations() {
  try {
    const response = await fetch(`${baseUrl}/locations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch locations", error.message);
  }
}

export async function createMatch(data) {
  try {
    const response = await fetch(`${baseUrl}/match`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      return { error: result.error || result.message };
    }
    return { success: true, data: result };
  } catch (error) {
    return { error: error.message };
  }
}

export async function createToken(data) {
  try {
    const response = await fetch(`${baseUrl}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      return { error: result.error || result.message };
    }
    return { success: true, data: result };
  } catch (error) {
    return { error: error.message };
  }
}

export async function insertCode(data) {
  try {
    const response = await fetch(`${baseUrl}/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Verification failed",
        status: response.status,
      };
    }
    return { success: true, data: result };
  } catch (error) {
    return { success: false, message: error.message || "Server error" };
  }
}
