import type React from "react"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import  Rebel  from "../assets/rebel.svg"
import styles from "./Login.module.css"

export const Login = ({
  handleLogin
} : {
  handleLogin: () => void;
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempted with:", { username, password })
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.imageContainer}>
          <img src={Rebel} className={styles.image}/>
        </div>
        <div className={styles.formContainer}>
          <h2 className={styles.title}>Login</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Username"
              />
            </div>
            <div className={styles.inputGroup}>
              <div className={styles.passwordInput}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.showPasswordButton}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <a href="#" className={styles.forgotPassword}>
              <span className={styles.forgotPasswordText}>
                Forgot password?
              </span>
            </a>
            <button type="submit" className={styles.loginButton}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;