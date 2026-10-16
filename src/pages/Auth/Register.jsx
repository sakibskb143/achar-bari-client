import { Globe } from 'lucide-react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, ErrorMessage } from "../../components/common";
import { FormField, PasswordField } from "../../components/forms";
import { useAuth } from "../../context/AuthContext";
import { getFirebaseErrorMessage } from "../../utils/getFirebaseErrorMessage";
import AuthPageLayout from "./AuthPageLayout";

function Register() {
  const navigate = useNavigate();
  const { registerWithEmail, loginWithGoogle } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (formData.password.length < 6) {
      setError("Password must be at least six characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      await registerWithEmail(formData.name, formData.email, formData.password);

      navigate("/dashboard", { replace: true });
    } catch (authError) {
      setError(getFirebaseErrorMessage(authError));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError("");
    setIsSubmitting(true);

    try {
      await loginWithGoogle();
      navigate("/dashboard", { replace: true });
    } catch (authError) {
      setError(getFirebaseErrorMessage(authError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthPageLayout
      eyebrow="Join AcharBari"
      title="Create Your Account"
      description="Create an account to save your favorite pickles and track your orders."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <ErrorMessage message={error} />

        <FormField
          label="Full name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
          autoComplete="name"
          required
          disabled={isSubmitting}
        />

        <FormField
          label="Email address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          autoComplete="email"
          required
          disabled={isSubmitting}
        />

        <PasswordField
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
          disabled={isSubmitting}
        />

        <PasswordField
          label="Confirm password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          autoComplete="new-password"
          disabled={isSubmitting}
        />

        <Button
          type="submit"
          fullWidth
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Create Account
        </Button>

        <div className="divider text-xs text-brand-muted">OR</div>

        <Button
          type="button"
          fullWidth
          variant="outline"
          disabled={isSubmitting}
          onClick={handleGoogleRegister}
        >
          <Globe size={18} aria-hidden="true" />
          Continue with Google
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-brand-muted">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-brand-primary hover:text-brand-secondary"
        >
          Login
        </Link>
      </p>
    </AuthPageLayout>
  );
}

export default Register;
