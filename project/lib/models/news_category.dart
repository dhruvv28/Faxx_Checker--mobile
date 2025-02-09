import 'package:flutter/material.dart';

enum NewsCategory {
  sports('sports', Icons.sports),
  finance('finance', Icons.attach_money),
  politics('politics', Icons.flag),
  entertainment('entertainment', Icons.movie),
  technology('technology', Icons.computer),
  science('science', Icons.science);

  final String name;
  final IconData icon;

  const NewsCategory(this.name, this.icon);
}