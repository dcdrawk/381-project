/* 
	This file builds on what we learned during the lecture/labs
	It is meant to add a drop-down menu functionality for smart phones or small screens
*/
	
//the function to hide the div, code is from: http://stackoverflow.com/questions/5277872/hide-a-div-if-screen-is-narrower-than-1024px */

// At first I was having problems on mobile, the menu would collapse automatically on tapping after opening the menu, solved this by adding a boolean and changing how the menu opens and closes, this fixed the issue. Source: intuition
var str = 0 ;
var dex = 0 ;
var con = 0 ;
var intel = 0 ;
var wis = 0 ;
var cha = 0 ;

var strMod = 0 ;
var dexMod = 0 ;
var conMod = 0 ;
var intelMod = 0 ;
var wisMod = 0 ;
var chaMod = 0 ;

var name = "";
var race = "";
var subRace = "";
var subRaceArray = [];
var charClass = "";
var exp = 0;
var levelXP = 0;
var background = "";
var alignment = "";
var skill = 0;
var skillName = "";
var skillArray = ['', '', '', '', '', '', '', '', '', ''];
var skillCheckArray = ['acrobaticsCheck', 'animalHandlingCheck', 'arcanaCheck', 'athleticsCheck', 'deceptionCheck', 'historyCheck', 'insightCheck', 'intimidationCheck', 'investigationCheck', 'medicineCheck', 'natureCheck', 'perceptionCheck', 'performanceCheck', 'persuasionCheck', 'religionCheck', 'slightOfHandCheck', 'stealthCheck', 'survivalCheck'];
var value = false;
var totalHP = 0;
var currentHP = 0;

var weaponCount = [];

var weaponTypeArray = {"-select-":"null", "Simple Melee":"simpleMelee", "Simlple Ranged":"simpleRanged", "Martial Melee":"martialMelee", "Martial Ranged":"martialRanged"};

var simpleMArray = {"-select-":"null", "Club":"Club", "Dagger":"Dagger", "Greatclub":"greatclub", "Handaxe":"handaxe", "Javelin":"javelin", "Light hammer":"lightHammer", "Mace":"mace", "Quarterstaff":"quarterstaff", "Sickle":"sickle", "Spear":"spear", "Unarmed":"unarmed"};

var simpleRArray = {"-select-":"null", "Light Crossbow":"lightCrossbow", "Dart":"dart", "Shortbow":"shortbow", "Sling":"sling"};

var martialMArray = {"-select-":"null", "Battleaxe":"battleaxe", "Flail":"flail", "Glaive":"glaive", "Greataxe":"greataxe", "Flail":"flail", "Greatsword":"greatsword", "Halberd":"halberd", "lance":"Lance", "Longsword":"longsword", "Maul":"maul", "Morningstar":"morningstar", "Pike":"pike", "Rapier":"rapier", "Scimitar":"scimitar", "Shortsword":"shortsword", "Trident":"trident", "War pick":"warPick", "Warhammer":"warhammer", "Whip":"whip"};

var martialRArray = {"-select-":"null", "Blowgun":"blowgun", "Hand Crossbow":"handCrossbow", "Heavy Crossbow":"heavycrossbos", "Longbow":"longbow", "Net":"net"};


$(document).ready( function() {
		
	//hides the initial menu button, even though it's display is already set to none, allows us to show it again
	//so if javascript is enabled, this button will show
    //on load
	
    $(window).resize(function(){
	});	
	
	getBasicInfo();
	getRaceStats();
	getProficiency();
	getAbilityMods();	
	getSkill();
	getSkillChecks();
	getCombatStats();
	getWeapons();
	//weaponList.html(getCookie('weaponList'));
	
	$('.skillValue').on('blur', function() {	
		skill = $(this).val();
		skillName = $(this).attr('id');
		setSkill(skill, skillName);
	});
	
	$('.skillUp').on('change', function() {
		
		if(this.checked==true){
			value = true;
		}
		
		if(this.checked==false){
			value = false;
		}
		
		checkName = $(this).attr('id');
		
		setSkillCheck(checkName, value);
	});
	
	$('#name').on('blur', function() {	
		name = $(this).val();
		setCookie('name', name, 9999);
	});
	
	$('#selectRace').on('change', function() {
		race = $(this).val();
		getSubRace(race);
		setCookie('race', race, 9999);
		getRaceStats();
		getCombatStats();
	});
	
	$('#selectSubRace').on('change', function() {
		subRace = $(this).val();
		setCookie('subRace', subRace, 9999);
		getRaceStats();
		getCombatStats();
	});
	
	$('#selectClass').on('change', function() {
		charClass = $(this).val();
		setCookie('charClass', charClass, 9999);
		getProficiency();
		getCombatStats();
	});
	
	$('#xp').on('blur', function() {
		exp = $(this).val();
		levelXP = getLevel(exp);
		$("#calcLevel").html(levelXP);
		setCookie('exp', exp, 9999);
		setCookie('level', levelXP, 9999);
		getProficiency();
	});
	
	$('#selectBackground').on('blur', function() {
		background = $(this).val();
		setCookie('background', background, 9999);
	});
	
	$('#selectAlignment').on('blur', function() {
		alignment = $(this).val();
		setCookie('alignment', alignment, 9999);
	});
	
	$('#strength').on('blur', function() {
		str = $(this).val();
		strMod = abilityMod(str);
		$("#strMod").html(strMod);
		setCookie('strength', str, 9999);
	});
	
	$('#dexterity').on('blur', function() {
		dex = $(this).val();
		dexMod = abilityMod(dex);
		$("#dexMod").html(dexMod);
		setCookie('dexterity', dex, 9999);
		getCombatStats();
	});
	
	$('#constitution').on('blur', function() {
		con = $(this).val();
		conMod = abilityMod(con);
		$("#conMod").html(conMod);
		setCookie('constitution', con, 9999);
	});
	
	$('#intelligence').on('blur', function() {
		intel = $(this).val();
		intelMod = abilityMod(intel);
		$("#intelMod").html(intelMod);
		setCookie('intelligence', intel, 9999);
	});
	
	$('#wisdom').on('blur', function() {
		wis = $(this).val();
		wisMod = abilityMod(wis);
		$("#wisMod").html(wisMod);
		setCookie('wisdom', wis, 9999);
	});
	
	$('#charisma').on('blur', function() {
		cha = $(this).val();
		chaMod = abilityMod(cha);
		$("#chaMod").html(chaMod);
		setCookie('charisma', cha, 9999);
	});
	
	$('#totalHealth').on('blur', function() {
		totalHP = $(this).val();
		setCookie('totalHP', totalHP, 9999);
		getCombatStats();
	});
	
	$('#currentHealth').on('blur', function() {
		currentHP = $(this).val();
		setCookie('currentHP', currentHP, 9999);
		getCombatStats();
	});
	
	$('#addWeap h3').on('click', function() {
		var weapCount = weaponCount.length;
		weaponCount.push(weapCount);
		console.log(weapCount);
		$("#weaponSelect").append("<div id='typeSelect" + weapCount + "' class='typeRow col-1of1'><div id='removeWeapBtn"+weapCount+"' class='removeBtn'><i class='fa fa-times'></i></div><select id='weaponType"+weapCount+"' class='weaponType col-1of3'></select><select id='weapon"+weapCount+"' class='col-1of3'><option value='null' >-none-</option></select><div id='addWeapBtn"+weapCount+"' class='addBtn'><i class='fa fa-plus-square'></i></div></div>");
		var $el = $("#weaponType"+weapCount);
		$.each(weaponTypeArray, function(key, value) {
			$el.append($("<option></option>")
				.attr("value", value).text(key));
		});
		getWeapList(weapCount);
		$('.removeBtn').on('click', function() {
			$(this).parent().remove();
		});
	});
	
	
	
	function getWeapList(number) {

		$('#weaponType'+number).on('change', function() {
			
			if($(this).val() == 'simpleMelee'){
				var el2 = $("#weapon"+number);
				el2.empty();
				$.each(simpleMArray, function(key, value) {
					el2.append($("<option></option>")
						.attr("value", value).text(key));
				});
			}
			if($(this).val() == 'simpleRanged'){
				var el2 = $("#weapon"+number);
				el2.empty();
				$.each(simpleRArray, function(key, value) {
					el2.append($("<option></option>")
						.attr("value", value).text(key));
				});
			}
			if($(this).val() == 'martialMelee'){
				var el2 = $("#weapon"+number);
				el2.empty();
				$.each(martialMArray, function(key, value) {
					el2.append($("<option></option>")
						.attr("value", value).text(key));
				});
			}
			if($(this).val() == 'martialRanged'){
				var el2 = $("#weapon"+number);
				el2.empty();
				$.each(martialRArray, function(key, value) {
					el2.append($("<option></option>")
						.attr("value", value).text(key));
				});
			}
			confirmWeapon(number);
		});	
	}
	
	function confirmWeapon(number) {
		$('#weapon'+number).on('change', function() {
			if($('#weapon'+number).val() != 'null'){
				$("#addWeapBtn"+number).css("display", "inline-block");
			}
			if($('#weapon'+number).val() == 'null'){
				$("#addWeapBtn"+number).css("display", "none");
			}
			
			addWeapon( number, $('#weapon'+number).val() );
		});
		
	}
	
	function addWeapon(number, weapon) {
		
		var profBonus = getProficiencyBonus(getCookie('level'));		
		var atkBonus = 0;
		
		
		$( '#addWeapBtn'+number).unbind( "click" );
		$('#addWeapBtn'+number).on('click', function() {
			var classBonus = getClassProficiency('weapon', weapon);
			var strMod = abilityMod(getCookie('strength'));
			var dexMod = abilityMod(getCookie('dexterity'));
			var count = $("#weaponList > *").length;
			console.log('WTF THERES ' + count + ' WEAPONS');
			if(weapon == 'Dagger'){
				if(dexMod > strMod){
					
					atkBonus = dexMod + classBonus;
				}
				if(dexMod < strMod){
					atkBonus = strMod + classBonus;
				}
				
				
				$('#typeSelect' + number).remove();
				
				$("#weaponList").append("<div class='weaponDiv col-1of1'><div class='weaponName col-1of3'><div id='removeWeapBtn"+count+"' class='removeBtn'><i class='fa fa-times'></i></div><h3>"+ weapon+"</h3></div><div class='col-1of3 atkBonus"+count+"'><h3>+ "+atkBonus+"</h3></div><div class='col-1of3 damageType'><h3>1d6 + "+atkBonus+"</h3></div></div>");
			}
			
			if(weapon == 'Club'){

				atkBonus = strMod + profBonus;

				$('#typeSelect' + number).remove();
				
				$("#weaponList").append("<div class='weaponDiv col-1of1'><div class='weaponName col-1of3'><div id='removeWeapBtn"+count+"' class='removeBtn'><i class='fa fa-times'></i></div><h3>"+ weapon+"</h3></div><div class='col-1of3 atkBonus"+count+"'><h3>+ "+atkBonus+"</h3></div><div class='col-1of3 damageType'><h3>1d6 + "+atkBonus+"</h3></div></div>");
			}
			
			setCookie('weaponList', $('#weaponList').html(), 9999);
			$('.removeBtn').on('click', function() {
				$(this).parent().parent().remove();
			});

			console.log(count + ' weapons');
		});
	}
	
	function getWeapons() {
		$('#weaponList').html(getCookie('weaponList'));
		$('.removeBtn').on('click', function() {
			$(this).parent().parent().remove();
			setCookie('weaponList', $('#weaponList').html(), 9999);
		});
		var count = $("#weaponList > *").length;
		console.log(count);
	}
	
	function getBasicInfo() {
		if(getCookie('name') != ""){
			$("#name").val(getCookie('name'));
		}
		if(getCookie('race') != ""){
			$("#selectRace").val(getCookie('race'));
			getSubRace(getCookie('race'));
		}
		if(getCookie('subRace') != ""){
			$("#selectSubRace").val(getCookie('subRace'));
		}
		if(getCookie('class') != ""){
			$("#selectClass").val(getCookie('charClass'));
		}
		if(getCookie('exp') != ""){
			exp = getCookie('exp');
			$("#xp").val(getCookie('exp'));
			$("#calcLevel").html(getLevel(exp));
		}
		if(getCookie('background') != ""){
			$("#selectBackground").val(getCookie('background'));
		}
		
		if(getCookie('alignment') != ""){
			$("#selectAlignment").val(getCookie('alignment'));
		}
	}
	
	function abilityMod(stat) { //calculates the ability score modifier for stats
		
		
		if(stat == 1){
			return -5;
		}
		
		if(stat >= 2 && stat <= 3){
			return -4;
		}
		
		if(stat >= 4 && stat <= 5){
			return -3;
		}
		
		if(stat >= 6 && stat <= 7){
			return -2;
		}
		
		if(stat >= 8 && stat <= 9){
			return -1;
		}
		
		if(stat >= 10 && stat <= 11){
			return 0;
		}
		
		if(stat >= 12 && stat <= 13){
			return 1;
		}
		
		if(stat >= 14 && stat <= 15){
			return 2;
		}
		
		if(stat >= 16 && stat <= 17){
			return 3;
		}
		
		if(stat >= 18 && stat <= 19){
			return 4;
		}
		
		if(stat >= 20 && stat <= 21){
			return 5;
		}
		
		if(stat >= 22 && stat <= 23){
			return 6;
		}
		
		if(stat >= 24 && stat <= 25){
			return 7;
		}
		
		if(stat >= 26 && stat <= 27){
			return 8;
		}
		
		if(stat >= 28 && stat <= 29){
			return 9;
		}
		
		if(stat >= 30){
			return 10;
		}
	}
	
	function getAbilityMods() { //get ability mod cookies
		$("#strength").val(getCookie('strength'));
		$("#strMod").html(abilityMod(getCookie('strength')));
		
		$("#dexterity").val(getCookie('dexterity'));
		$("#dexMod").html(abilityMod(getCookie('dexterity')));
		
		$("#constitution").val(getCookie('constitution'));
		$("#conMod").html(abilityMod(getCookie('constitution')));
		
		$("#intelligence").val(getCookie('intelligence'));
		$("#intelMod").html(abilityMod(getCookie('intelligence')));
		
		$("#wisdom").val(getCookie('wisdom'));
		$("#wisMod").html(abilityMod(getCookie('wisdom')));
		
		$("#charisma").val(getCookie('charisma'));
		$("#chaMod").html(abilityMod(getCookie('charisma')));
	}
	
	function getRaceStats(){
		race = getCookie('race');
		subRace = getCookie('subRace');
		$('.stat').css( "border", "1px solid rgba(126, 126, 126, 0.7)" );
		if(subRace == 'mountainDwarf' || race == 'halfOrc' || race == 'dragonborn' || race=='human'){
			$('#strength').css( "border", "2px solid rgb(143, 202, 150)" );
		} if(race == 'elf' || race == 'halfling' || subRace == 'forestGnome' || race=='human'){
			$('#dexterity').css( "border", "2px solid rgb(143, 202, 150)" );
		} if(race == 'dwarf' || race == 'halfOrc' || subRace == 'stout' || subRace == 'forestgnome' || race=='human'){
			$('#constitution').css( "border", "2px solid rgb(143, 202, 150)" );
		} if(subRace == 'highelf' || race == 'tiefling' || race == 'gnome' || race=='human'){
			$('#intelligence').css( "border", "2px solid rgb(143, 202, 150)" );
		} if(subRace == 'hilldwarf' || subRace == 'woodelf' || race=='human'){
			$('#wisdom').css( "border", "2px solid rgb(143, 202, 150)" );
		} if(race == 'halfelf' || subRace == 'lightfoot' || race=='human' || race=='tiefling' || subRace=='darkelf' || race=='dragonborn'){
			$('#charisma').css( "border", "2px solid rgb(143, 202, 150)" );
		}
	}
	
	function getSubRace(race) { //calculates the subRace 
		console.log ( race );
		
		if (race=='drow' || race=='halfelf' || race=='halforc' || race=='human' || race=='kender' || race=='tiefling' || race=='warforged	'){
			subRaceArray = {"-none-": "null"};
			var $el = $("#selectSubRace");	
			$el.empty();
			$.each(subRaceArray, function(key, value) {
				$el.append($("<option></option>")
					.attr("value", value).text(key));
			});
		}
		
		if (race=='dragonborn'){
			subRaceArray = {"-select-":"null", "Black":"black", "Blue":"blue",  "Brass":"brass",  "Bronze":"bronze",  "Copper":"copper",  "Gold":"gold",  "Green":"green",  "Red":"red",  "Silver":"silver",  "White":"white"};
			var $el = $("#selectSubRace");	
			$el.empty();
			$.each(subRaceArray, function(key, value) {
				$el.append($("<option></option>")
					.attr("value", value).text(key));
			});
		}
		
		if (race=='dwarf'){
			subRaceArray = {"-select-":"null", "Hill Dwarf":"hilldwarf", "Mountain Dwarf":"mountaindwarf"};
			var $el = $("#selectSubRace");	
			$el.empty();
			$.each(subRaceArray, function(key, value) {
				$el.append($("<option></option>")
					.attr("value", value).text(key));
			});
		}
		
		if (race=='elf'){
			subRaceArray = {"-select-":"null", "High Elf":"highelf", "Wood Elf":"woodelf", "Dark Elf (Drow)":"darkelf"};
			var $el = $("#selectSubRace");	
			$el.empty();
			$.each(subRaceArray, function(key, value) {
				$el.append($("<option></option>")
					.attr("value", value).text(key));
			});
		}
		
		if (race=='gnome'){
			subRaceArray = {"-select-":"null", "Forest Gnome":"forestgnome", "Rock Gnome":"rockgnome"};
			var $el = $("#selectSubRace");	
			$el.empty();
			$.each(subRaceArray, function(key, value) {
				$el.append($("<option></option>")
					.attr("value", value).text(key));
			});
		}
		
		if (race=='halfling'){
			subRaceArray = {"-select-": "null", "Lightfoot": "lightfoot", "Stout": "stout" };
			var $el = $("#selectSubRace");	
			$el.empty();
			$.each(subRaceArray, function(key, value) {
				$el.append($("<option></option>")
					.attr("value", value).text(key));
			});
		}
		
		if (race=='halfling'){
			subRaceArray = {"-select-": "null", "Lightfoot": "lightfoot", "Stout": "stout" };
			var $el = $("#selectSubRace");	
			$el.empty();
			$.each(subRaceArray, function(key, value) {
				$el.append($("<option></option>")
					.attr("value", value).text(key));
			});
		}
		
	}
	
	function getLevel(exp) { //calculates the level based on experience
		if(exp >= 0 && exp < 300){return 1;}
		if(exp >= 300 && exp < 900){return 2;}
		if(exp >= 900 && exp < 2700){return 3;}
		if(exp >= 2700 && exp < 6500){return 4;}
		if(exp >= 6500 && exp < 14000){return 5;}
		
		if(exp >= 14000 && exp < 23000){return 6;}
		if(exp >= 23000 && exp < 34000){return 7;}
		if(exp >= 34000 && exp < 48000){return 8;}
		if(exp >= 48000 && exp < 64000){return 9;}
		if(exp >= 64000 && exp < 85000){return 10;}
		
		if(exp >= 85000 && exp < 100000){return 11;}
		if(exp >= 100000 && exp < 120000){return 12;}
		if(exp >= 120000 && exp < 140000){return 13;}
		if(exp >= 140000 && exp < 165000){return 14;}
		if(exp >= 165000 && exp < 195000){return 15;}
		
		if(exp >= 195000 && exp < 225000){return 16;}
		if(exp >= 195000 && exp < 265000){return 17;}
		if(exp >= 195000 && exp < 305000){return 18;}
		if(exp >= 195000 && exp < 355000){return 19;}
		if(exp >= 355000){return 20;}		
		
	}
	
	function getProficiency() {
		pClass = getCookie('charClass');
		console.log(getCookie('charClass'));
		if(getCookie('level') != ""){
			$("#profBonus").html("<strong>Proficiency Bonus:</strong> +" + getProficiencyBonus(getCookie('level')));
		}
		
		if(pClass == 'barbarian'){
			$("#armorProf").html("<strong>Armor:</strong> Light and medium armor, shields");
			$("#weaponProf").html("<strong>Weapons:</strong> Simple weapons, martial weapons");
			$("#toolsProf").html("<strong>Tools:</strong> None");
			$("#savingProf").html("<strong>Saving Throws:</strong> Strength, Constitution");
			$("#skillsProf").html("<strong>Skills:</strong> Choose two from Animal Handling, Athletics, Intimidation, Nature, Perception, and Survival");
		}
		
		if(pClass == 'bard'){
			$("#armorProf").html("<strong>Armor:</strong> Light armor");
			$("#weaponProf").html("<strong>Weapons:</strong> Simple weapons, hand crossbows, longswords, rapiers, shortswords");
			$("#toolsProf").html("<strong>Tools:</strong> Three Musical Instruments of your choice");
			$("#savingProf").html("<strong>Saving Throws:</strong> Intelligence, Charisma");
			$("#skillsProf").html("<strong>Skills:</strong> Choose any three");
		}
		
		if(pClass == 'cleric'){
			$("#armorProf").html("<strong>Armor:</strong> Light and medium armor, shields");
			$("#weaponProf").html("<strong>Weapons:</strong> All simple weapons");
			$("#toolsProf").html("<strong>Tools:</strong> None");
			$("#savingProf").html("<strong>Saving Throws:</strong> Wisdom, Charisma");
			$("#skillsProf").html("<strong>Skills:</strong> Choose two from History, Insight, Medicine, Persuasion, and Religion");
		}
		
		if(pClass == 'druid'){
			$("#armorProf").html("<strong>Armor:</strong> Light armor, medium armor, and shields made of wood");
			$("#weaponProf").html("<strong>Weapons:</strong> Clubs, daggers, darts, javelins, maces, quarterstaffs, scimitars, sickles, slings, and spears");
			$("#toolsProf").html("<strong>Tools:</strong> Herbalism Kit");
			$("#savingProf").html("<strong>Saving Throws:</strong> Wisdom, Charisma");
			$("#skillsProf").html("<strong>Skills:</strong> Choose two from Arcana, Animal Handling, Insight, Medicine, Nature, Perception, Religion, and Survival");
		}
		
		if(pClass == 'fighter'){
			$("#armorProf").html("<strong>Armor:</strong> All armor, shields");
			$("#weaponProf").html("<strong>Weapons:</strong> Simple weapons, martial weapons");
			$("#toolsProf").html("<strong>Tools:</strong> None");
			$("#savingProf").html("<strong>Saving Throws:</strong> Strength, Constitution");
			$("#skillsProf").html("<strong>Skills:</strong> Choose two from Acrobatics, Animal Handling, Athletics, History, Insight, Intimidation, Perception, and Survival");
		}
		
		if(pClass == 'monk'){
			$("#armorProf").html("<strong>Armor:</strong> none");
			$("#weaponProf").html("<strong>Weapons:</strong> simple weapons, shortswords");
			$("#toolsProf").html("<strong>Tools:</strong> Choose one type of artisan's tools or one musical instrument");
			$("#savingProf").html("<strong>Saving Throws:</strong> Strength, Dex");
			$("#skillsProf").html("<strong>Skills:</strong> Choose one from Arobatics, Athletics, History, Insight, Religion, and Stealth");
		}
		
		if(pClass == 'paladin'){
			$("#armorProf").html("<strong>Armor:</strong> All armor, shields");
			$("#weaponProf").html("<strong>Weapons:</strong> Simple weapons, martial weapons");
			$("#toolsProf").html("<strong>Tools:</strong> None");
			$("#savingProf").html("<strong>Saving Throws:</strong>Wisdom, Charisma");
			$("#skillsProf").html("<strong>Skills:</strong> Choose one from Athletics, Insight, Intimidation, Medicine, Persuasion, and Religion");
		}
		
		if(pClass == 'ranger'){
			$("#armorProf").html("<strong>Armor:</strong> Light and medium armor, shields");
			$("#weaponProf").html("<strong>Weapons:</strong> Simple weapons, martial weapons");
			$("#toolsProf").html("<strong>Tools:</strong> None");
			$("#savingProf").html("<strong>Saving Throws:</strong> Strength, Dexterity");
			$("#skillsProf").html("<strong>Skills:</strong> Choose three from Animal Handling, Athletics, Insight, Investigation, Nature, Perception, Stealth, and Survival");
		}
		
		if(pClass == 'rogue'){
			$("#armorProf").html("<strong>Armor:</strong> Light armor");
			$("#weaponProf").html("<strong>Weapons:</strong> Simple weapons, hand crossbows, longswords, rapiers, shortswords");
			$("#toolsProf").html("<strong>Tools:</strong> Thieves' tools");
			$("#savingProf").html("<strong>Saving Throws:</strong> Dexterity, Intelligence");
			$("#skillsProf").html("<strong>Skills:</strong> Choose four from Acrobatics, Athletics, Deception, Insight, Intimidation, Investigation, Perception, Performance, Persuasion, Sleight of Hand, and Stealth");
		}
		
		if(pClass == 'sorcerer'){
			$("#armorProf").html("<strong>Armor:</strong> None");
			$("#weaponProf").html("<strong>Weapons:</strong> Daggers, darts, slings, quarterstaffs, light crossbows");
			$("#toolsProf").html("<strong>Tools:</strong> None");
			$("#savingProf").html("<strong>Saving Throws:</strong> Constitution, Charisma");
			$("#skillsProf").html("<strong>Skills:</strong> Choose two from Arcana, Deception, Insight, Intimidation, Persuasion, and Religion");
		}
		
		if(pClass == 'warlock'){
			$("#armorProf").html("<strong>Armor:</strong> Light Armor");
			$("#weaponProf").html("<strong>Weapons:</strong> Simple weapons");
			$("#toolsProf").html("<strong>Tools:</strong> None");
			$("#savingProf").html("<strong>Saving Throws:</strong> Wisdom, Charisma");
			$("#skillsProf").html("<strong>Skills:</strong> Choose two from Arcana, Deception, History, Intimidation, Investigation, Nature, and Religion");
		}
		
		if(pClass == 'wizard'){
			$("#armorProf").html("<strong>Armor:</strong> None");
			$("#weaponProf").html("<strong>Weapons:</strong> Daggers, darts, slings, quarterstaffs, light crossbows");
			$("#toolsProf").html("<strong>Tools:</strong> None");
			$("#savingProf").html("<strong>Saving Throws:</strong> Intelligence, Wisdom");
			$("#skillsProf").html("<strong>Skills:</strong> Choose two from Arcana, History, Insight, Investigation, Medicine, and Religion");
		}
	}
	
	function getClassProficiency(type, input){
		var simpleMArray = ["Club", "Dagger", "Greatclub", "Handaxe", "Javelin", "lightHammer", "mace", "quarterstaff", "sickle", "Spear", "Unarmed"];
		var charClass = getCookie('charClass');
		var attackBonus = 0;
		
		var profBonus = getProficiencyBonus(getCookie('level'));
		
		if(type == 'weapon'){
			if(charClass == 'rogue'){
				
				for(var i = 0; i < simpleMArray.length; i++){
					
					if(input == simpleMArray[i]){
						console.log(simpleMArray[i]);
						attackBonus = profBonus;
						return attackBonus;
					}
				}
			}
		}
	}
	
	function getProficiencyBonus(level) {
		if(level >= 1 && level < 5){
			return 2;
		}
		if(level >= 5 && level < 9){
			return 3;
		}
		if(level >= 9 && level < 13){
			return 4;
		}
		if(level >= 13 && level < 17){
			return 5;
		}
		if(level >= 17){
			return 5;
		}
	}
	
	function setSkill(skill, skillName) {
		if(skillName=='acrobaticsSkill'){
			setCookie('acrobatics', skill, 9999);
		}
		if(skillName=='animalHandlingSkill'){
			setCookie('animalHandling', skill, 9999);
		}
		if(skillName=='arcanaSkill'){
			setCookie('arcana', skill, 9999);
		}
		if(skillName=='athleticsSkill'){
			setCookie('athletics', skill, 9999);
		}
		if(skillName=='deceptionSkill'){
			setCookie('deception', skill, 9999);
		}
		if(skillName=='historySkill'){
			setCookie('history', skill, 9999);
		}
		if(skillName=='insightSkill'){
			setCookie('insight', skill, 9999);
		}
		if(skillName=='intimidationSkill'){
			setCookie('intimidation', skill, 9999);
		}
		if(skillName=='investigationSkill'){
			setCookie('investigation', skill, 9999);
		}
		if(skillName=='medicineSkill'){
			setCookie('medicine', skill, 9999);
		}
		if(skillName=='natureSkill'){
			setCookie('nature', skill, 9999);
		}
		if(skillName=='perceptionSkill'){
			setCookie('perception', skill, 9999);
		}
		if(skillName=='performanceSkill'){
			setCookie('performance', skill, 9999);
		}
		if(skillName=='persuasionSkill'){
			setCookie('persuasion', skill, 9999);
		}
		if(skillName=='religionSkill'){
			setCookie('religion', skill, 9999);
		}
		if(skillName=='slightOfHandSkill'){
			setCookie('slightOfHand', skill, 9999);
		}
		if(skillName=='stealthSkill'){
			setCookie('stealth', skill, 9999);
		}
		if(skillName=='survivalSkill'){
			setCookie('survival', skill, 9999);
		}
	}
	
	function setSkillCheck(checkName, value) {
		if(checkName=='acrobaticsCheck'){
			console.log('testing');
			setCookie('acrobaticsCheck', value, 9999);
		}
		if(checkName=='animalHandlingCheck'){
			setCookie('animalHandlingCheck', value, 9999);
		}
		if(checkName=='arcanaCheck'){
			setCookie('arcanaCheck', value, 9999);
		}
		if(checkName=='athleticsCheck'){
			setCookie('athleticsCheck', value, 9999);
		}
		if(checkName=='deceptionCheck'){
			setCookie('deceptionCheck', value, 9999);
		}
		if(checkName=='historyCheck'){
			setCookie('historyCheck', value, 9999);
		}
		if(checkName=='insightCheck'){
			setCookie('insightCheck', value, 9999);
		}
		if(checkName=='intimidationCheck'){
			setCookie('intimidationCheck', value, 9999);
		}
		if(checkName=='investigationCheck'){
			setCookie('investigationCheck', value, 9999);
		}
		if(checkName=='medicineCheck'){
			setCookie('medicineCheck', value, 9999);
		}
		if(checkName=='natureCheck'){
			setCookie('natureCheck', value, 9999);
		}
		if(checkName=='perceptionCheck'){
			setCookie('perceptionCheck', value, 9999);
		}
		if(checkName=='performanceCheck'){
			setCookie('performanceCheck', value, 9999);
		}
		if(checkName=='persuasionCheck'){
			setCookie('persuasionCheck', value, 9999);
		}
		if(checkName=='religionCheck'){
			setCookie('religionCheck', value, 9999);
		}
		if(checkName=='slightOfHandCheck'){
			setCookie('slightOfHandCheck', value, 9999);
		}
		if(checkName=='stealthCheck'){
			setCookie('stealthCheck', value, 9999);
		}
		if(checkName=='survivalCheck'){
			setCookie('survivalCheck', value, 9999);
		}
	}
	
	function getSkill() {
		$("#acrobaticsSkill").val(getCookie('acrobatics'));
		$("#animalHandlingSkill").val(getCookie('animalHandling'));
		$("#arcanaSkill").val(getCookie('arcana'));
		$("#athleticsSkill").val(getCookie('athletics'));
		$("#deceptionSkill").val(getCookie('deception'));
		$("#historySkill").val(getCookie('history'));
		$("#insightSkill").val(getCookie('insight'));
		$("#intimidationSkill").val(getCookie('intimidation'));
		$("#investigationSkill").val(getCookie('investigation'));
		$("#medicineSkill").val(getCookie('medicine'));
		$("#natureSkill").val(getCookie('nature'));
		$("#perceptionSkill").val(getCookie('perception'));
		$("#performanceSkill").val(getCookie('performance'));
		$("#persuasionSkill").val(getCookie('persuasion'));
		$("#religionSkill").val(getCookie('religion'));
		$("#slightOfHandSkill").val(getCookie('slightOfHand'));
		$("#stealthSkill").val(getCookie('stealth'));
		$("#survivalSkill").val(getCookie('survival'));
	}
	
	function getSkillChecks(checkName) {
	
		var checkName = getCookie(checkName);
		
		for(var i = 0; i < skillCheckArray.length; i++){
			checkName = skillCheckArray[i];
			
			if(getCookie(checkName) == 'true'){
				console.log(checkName + " true!!!");
				$('#'+checkName).prop('checked', true);
			}
			
		}
			


	}
	
	function getCombatStats() {
		armorClass = 10 + abilityMod(getCookie('dexterity'));
		$('#armorClass').html('<h3>' + armorClass + '</h3>');
		
		initiative = abilityMod(getCookie('dexterity'));
		$('#initiative').html('<h3>+ ' + initiative + '</h3>');
		
		race = getCookie('race');
		subRace = getCookie('subRace');
		if(race == 'halfling' || race == 'dwarf' || race == 'gnome'){
			speed = 25;
		}
		
		if(race == 'elf' || race == 'human' || race == 'dragonborn' || race == 'halfelf' || race == 'halforc' || race == 'tiefling'){
			speed = 30;
		}
		
		if(subRace == 'woodelf'){
			speed = 35;
		}
		
		$('#speed').html('<h3>' + speed + ' ft</h3>');
		
		totalHP = getCookie('totalHP');
		currentHP = getCookie('currentHP');
		
		$('#totalHealth').val(totalHP);
		$('#currentHealth').val(currentHP);
		
		charClass = getCookie('class');
		
		if (charClass == 'wizard' || charClass == 'sorcerer'){
			$('#hitDice').html('<h3>1d6</h3>');
		}
		
		if (charClass == 'bard' || charClass == 'druid' || charClass == 'cleric' || charClass == 'monk' || charClass == 'rogue' || charClass == 'warlock'){
			$('#hitDice').html('<h3>1d8</h3>');
		}
		
		if (charClass == 'fighter' || charClass == 'paladin' || charClass == 'ranger'){
			$('#hitDice').html('<h3>1d10</h3>');
		}
		
		if (charClass == 'barbarian'){
			$('#hitDice').html('<h3>1d12</h3>');
		}
	}
	
	function setCookie(cname, cvalue, exdays) {
		console.log ( 'set Cookie' );
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}
	
	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
		}
		return "";
	}
	
	function checkCookie(cname) {
		var cname = getCookie(cname);
		if (cname == "") {
			alert("Welcome cookie not set");
		} else {
		   alert(cname);
		}
	}

	
});

