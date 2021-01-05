package project.pitchinganalyzer;

import java.io.IOException;
import java.io.BufferedReader;
import java.io.PrintWriter;
import java.util.List;
import java.util.ArrayList;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

@WebServlet("/project/pitchinganalyzer/analyzer")
public class AnalyzerServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	public void init() throws ServletException {
		ServletContext context = this.getServletContext();
		GameData gameData = (GameData) context.getAttribute("GameData");
		if (gameData == null) {
			gameData = new GameData();
			context.setAttribute("GameData", gameData);
		}
	}

// 	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
// 		request.setCharacterEncoding("UTF-8");
// 		HttpSession session = request.getSession();
//
// 		GameData gameData = new GameData();
//
// 		String userName = request.getParameter("loginUser");
// 		String pitcherName = request.getParameter("pitcherName");
// 		List<String[]> datas = gameData.getGameData(userName, pitcherName);
// 		int dasekisuu = 0;
//
// 		for(String[] data: datas)
// 			if(data[0].equals("M4RK"))
// 			dasekisuu++;
//
// 		StringBuilder builder = new StringBuilder();
// 		builder.append(dasekisuu);
// 		String json = builder.toString();
//
// 		response.setContentType("application/json");
// 		PrintWriter writer = response.getWriter();
// 		writer.append(json);
// 		writer.flush();
//
// }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		HttpSession session = request.getSession();

		GameData gameData = new GameData();

		String userName = request.getParameter("loginUser");
		String pitcherName = request.getParameter("pitcherName");
		List<double[]> analyzedDatas = gameData.analyzeGameData(userName, pitcherName);

		double[] doubleRate = analyzedDatas.get(0);
    double[] doubleSpeed = analyzedDatas.get(1);
    double[] doublehited = analyzedDatas.get(2);

		int[] rateByBallType = new int[10];
    int[] speedByBallType = new int[10];
    int[] hitedByBallType = new int[10];

		for (int i = 0;i < 10 ;i++ ) {
			rateByBallType[i] = (int)(doubleRate[i]  * 100);
			speedByBallType[i] = (int)doubleSpeed[i];
			hitedByBallType[i] = (int)(doublehited[i] * 1000);
		}

		StringBuilder builder = new StringBuilder();
		builder.append('{');

		//球種割合
		builder.append("\"rateByBallType\":");
		builder.append("[");
		for(int i = 0; i < rateByBallType.length - 1; i++){
			builder.append(rateByBallType[i]).append(",");
		}
		builder.append(rateByBallType[rateByBallType.length - 1]).append("],");

		//球速平均
		builder.append("\"speedByBallType\":");
		builder.append("[");
		for(int i = 0; i < speedByBallType.length - 1; i++){
			builder.append(speedByBallType[i]).append(",");
		}
		builder.append(speedByBallType[speedByBallType.length - 1]).append("],");

		//被打率
		builder.append("\"hitedByBallType\":");
		builder.append("[");
		for(int i = 0; i < hitedByBallType.length - 1; i++){
			builder.append(hitedByBallType[i]).append(",");
		}
		builder.append(hitedByBallType[hitedByBallType.length - 1]).append("]");

		builder.append("}");


	String json = builder.toString();
	response.setContentType("application/json");
	PrintWriter writer = response.getWriter();
	writer.append(json);
	writer.flush();
}

}
