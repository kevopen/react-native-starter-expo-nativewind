import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    TextInput,
    View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);
    
    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, any email/password combination works
      router.push("/main/home");
    }, 1000);
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <Image
              source={require("@/assets/images/react-logo.png")}
              style={styles.logo}
              contentFit="contain"
            />
            <ThemedText type="title" style={styles.title}>
              Welcome Back
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Sign in to continue to your account
            </ThemedText>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Email</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#666"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Password</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#666"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.loginButton,
                pressed && styles.buttonPressed,
                isLoading && styles.buttonDisabled,
              ]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <ThemedText style={styles.loginButtonText}>
                {isLoading ? "Signing In..." : "Sign In"}
              </ThemedText>
            </Pressable>

            <Pressable style={styles.forgotPassword}>
              <ThemedText style={styles.forgotPasswordText}>
                Forgot Password?
              </ThemedText>
            </Pressable>
          </View>

          {/* Register Section */}
          <View style={styles.registerSection}>
            <ThemedText style={styles.registerText}>
              Don't have an account?{" "}
            </ThemedText>
            <Pressable onPress={handleRegister}>
              <ThemedText style={styles.registerLink}>Sign Up</ThemedText>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 48,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
  formSection: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#fff",
  },
  loginButton: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
    backgroundColor: "#0056CC",
  },
  buttonDisabled: {
    opacity: 0.5,
    backgroundColor: "#004499",
  },
  forgotPassword: {
    alignItems: "center",
    marginTop: 16,
  },
  forgotPasswordText: {
    color: "#007AFF",
    fontSize: 16,
  },
  registerSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  registerText: {
    color: "#888",
    fontSize: 16,
  },
  registerLink: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
});