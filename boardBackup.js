  <View>
      <View style={styles.Container}>
      <Text style={styles.Top}>게시판</Text>
        <View style={styles.menuContainer} horizontal ={true}>
        <View style={styles.textContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("전체 게시판")} style={styles.textStyle}>
        <Text style={styles.textStyle}> 전체 </Text>
        </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.textContainer}>
        <Text style={styles.textStyle}> <Text onPress={()=> alert('자유게시판으로 이동 ')}></Text>자유</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.textContainer}>
        <Text style={styles.textStyle}> <Text onPress={()=> alert('공모전 게시판으로 이동 ')}></Text>공모전</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.textContainer}>
        <Text style={styles.textStyle}> <Text onPress={()=> alert('동아리 게시판으로 이동 ')}></Text>동아리</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.textContainer}>
        <Text style={styles.textStyle}> <Text onPress={()=> alert('취업 게시판으로 이동 ')}></Text>취업</Text>
        </TouchableOpacity>

        </View>
        </View>
    </View>