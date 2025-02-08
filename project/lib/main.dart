import 'package:flutter/material.dart';
import 'package:faxx_checker/screens/splash_screen.dart';
import 'package:faxx_checker/theme/app_theme.dart';
import 'package:faxx_checker/screens/main_screen.dart'; 
import 'package:faxx_checker/screens/login_screen.dart';
import 'package:faxx_checker/screens/signup_screen.dart';


void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'FaxxChecker',
      theme: AppTheme.lightTheme,
      home: const SplashScreen(), // Start with SplashScreen
      debugShowCheckedModeBanner: false,
      // Define routes for navigation
      routes: {
        '/login': (context) => const LoginScreen(),
        '/signup': (context) => const SignupScreen(),
        '/main': (context) => const MainScreen(),
      },
    );
  }
}